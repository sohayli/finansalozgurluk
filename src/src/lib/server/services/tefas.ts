import type { TefasFund, TefasFundHistory, TefasFundTypeCode, TefasApiResponse, TefasRawRow } from '$lib/types/tefas';

const TEFAS_PAGE_URL = 'https://www.tefas.gov.tr/TarihselVeriler.aspx';
const TEFAS_HISTORY_URL = 'https://www.tefas.gov.tr/api/DB/BindHistoryInfo';
const TIMEOUT_MS = 30000;

const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36';

function toNumber(value: unknown): number {
	if (typeof value === 'number') {
		return Number.isFinite(value) ? value : 0;
	}
	if (typeof value === 'string') {
		const trimmed = value.trim();
		const normalized = trimmed.includes(',') && trimmed.includes('.') && trimmed.lastIndexOf(',') > trimmed.lastIndexOf('.')
			? trimmed.replace(/\./g, '').replace(',', '.')
			: trimmed.replace(',', '.');
		const parsed = Number(normalized);
		return Number.isFinite(parsed) ? parsed : 0;
	}
	return 0;
}

function toInteger(value: unknown): number {
	return Math.trunc(toNumber(value));
}

function formatIsoDate(date: Date): string {
	return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')}`;
}

function formatTefasDate(date: Date): string {
	return `${String(date.getUTCDate()).padStart(2, '0')}.${String(date.getUTCMonth() + 1).padStart(2, '0')}.${date.getUTCFullYear()}`;
}

function mapFundTypeCode(fundTypeCode: TefasFundTypeCode): 'YAT' | 'EMK' {
	if (fundTypeCode === 0) return 'YAT';
	if (fundTypeCode === 1) return 'EMK';
	throw new Error(`Desteklenmeyen TEFAS fon tipi: ${fundTypeCode}`);
}

function normalizeRawRow(row: TefasRawRow): TefasFund | null {
	const code = String(row.FONKODU ?? '').trim().toUpperCase();
	const name = String(row.FONUNVAN ?? '').trim();
	const price = toNumber(row.FIYAT);
	
	if (!code || !name || price <= 0) return null;

	const sessionDate = row.TARIH != null ? new Date(Number(row.TARIH)) : null;
	const date = sessionDate && !Number.isNaN(sessionDate.getTime()) ? formatTefasDate(sessionDate) : formatTefasDate(new Date());

	return {
		code,
		name,
		shortName: code,
		price,
		previousPrice: 0,
		dailyReturn: 0,
		portfolioSize: toNumber(row.PORTFOYBUYUKLUK),
		investorCount: toInteger(row.KISISAYISI),
		shareCount: toInteger(row.TEDPAYSAYISI),
		date,
		fundType: 'YAT'
	};
}

async function fetchWithTimeout(url: string, options: RequestInit, timeout: number): Promise<Response> {
	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), timeout);
	
	try {
		const response = await fetch(url, {
			...options,
			signal: controller.signal
		});
		return response;
	} finally {
		clearTimeout(timeoutId);
	}
}

async function getTefasCookies(): Promise<string> {
	try {
		const landing = await fetchWithTimeout(TEFAS_PAGE_URL, {
			headers: {
				'User-Agent': USER_AGENT,
				'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
				'Accept-Language': 'tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7'
			}
		}, TIMEOUT_MS);

		const cookieHeader = landing.headers.get('set-cookie') || '';
		const cookies = cookieHeader.split(',').map(c => c.split(';')[0].trim()).filter(Boolean);
		return cookies.join('; ');
	} catch {
		return '';
	}
}

export async function fetchTefasFunds(options?: {
	fundTypeCode?: TefasFundTypeCode;
	date?: Date;
	fromDate?: Date;
	toDate?: Date;
}): Promise<TefasFund[]> {
	const fundTypeCode = options?.fundTypeCode ?? 0;
	const date = options?.date ?? new Date();
	const fromDate = options?.fromDate ?? date;
	const toDate = options?.toDate ?? date;

	const fontip = mapFundTypeCode(fundTypeCode);
	const bastarih = formatIsoDate(fromDate);
	const bittarih = formatIsoDate(toDate);

	try {
		const cookies = await getTefasCookies();

		const body = new URLSearchParams({
			fontip,
			fonkod: '',
			bastarih,
			bittarih
		});

		const response = await fetchWithTimeout(TEFAS_HISTORY_URL, {
			method: 'POST',
			headers: {
				'User-Agent': USER_AGENT,
				'Accept': 'application/json, text/javascript, */*; q=0.01',
				'Accept-Language': 'tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7',
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
				'X-Requested-With': 'XMLHttpRequest',
				'Origin': 'https://www.tefas.gov.tr',
				'Referer': TEFAS_PAGE_URL,
				'Cookie': cookies
			},
			body: body.toString()
		}, TIMEOUT_MS);

		if (response.status !== 200) {
			throw new Error(`TEFAS API ${response.status}`);
		}

		const text = await response.text();
		
		if (text.includes('Request Rejected')) {
			throw new Error('TEFAS WAF isteği reddetti');
		}

		const parsed: TefasApiResponse = JSON.parse(text);
		const rows = (parsed.data ?? [])
			.map(normalizeRawRow)
			.filter((row): row is TefasFund => row != null);

		return rows.map(row => ({
			...row,
			fundType: fontip
		}));
	} catch (error) {
		console.error('TEFAS fetch error:', error);
		throw error;
	}
}

export async function fetchTefasFundHistory(code: string, options?: {
	fundTypeCode?: TefasFundTypeCode;
	fromDate?: Date;
	toDate?: Date;
}): Promise<TefasFundHistory[]> {
	const fundTypeCode = options?.fundTypeCode ?? 0;
	const fromDate = options?.fromDate ?? new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
	const toDate = options?.toDate ?? new Date();

	const fontip = mapFundTypeCode(fundTypeCode);
	const bastarih = formatIsoDate(fromDate);
	const bittarih = formatIsoDate(toDate);

	try {
		const cookies = await getTefasCookies();

		const body = new URLSearchParams({
			fontip,
			fonkod: code.toUpperCase(),
			bastarih,
			bittarih
		});

		const response = await fetchWithTimeout(TEFAS_HISTORY_URL, {
			method: 'POST',
			headers: {
				'User-Agent': USER_AGENT,
				'Accept': 'application/json, text/javascript, */*; q=0.01',
				'Accept-Language': 'tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7',
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
				'X-Requested-With': 'XMLHttpRequest',
				'Origin': 'https://www.tefas.gov.tr',
				'Referer': TEFAS_PAGE_URL,
				'Cookie': cookies
			},
			body: body.toString()
		}, TIMEOUT_MS);

		if (response.status !== 200) {
			throw new Error(`TEFAS API ${response.status}`);
		}

		const text = await response.text();
		const parsed: TefasApiResponse = JSON.parse(text);

		const history: TefasFundHistory[] = [];
		const rows = (parsed.data ?? [])
			.map(normalizeRawRow)
			.filter((row): row is TefasFund => row != null);

		for (const row of rows) {
			if (row.code === code.toUpperCase()) {
				history.push({
					code: row.code,
					date: row.date,
					price: row.price,
					dailyReturn: row.dailyReturn,
					portfolioSize: row.portfolioSize,
					investorCount: row.investorCount
				});
			}
		}

		return history.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
	} catch (error) {
		console.error(`TEFAS history fetch error for ${code}:`, error);
		throw error;
	}
}

export async function fetchAllTefasFunds(): Promise<TefasFund[]> {
	const investmentFunds = await fetchTefasFunds({ fundTypeCode: 0 });
	const pensionFunds = await fetchTefasFunds({ fundTypeCode: 1 });
	
	return [...investmentFunds, ...pensionFunds];
}