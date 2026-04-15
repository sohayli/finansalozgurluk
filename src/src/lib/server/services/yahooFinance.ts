import yahooFinance from 'yahoo-finance2';
import type { MarketQuote, HistoricalPrice, SearchResult } from '$lib/types/market';

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache
const priceCache = new Map<string, { data: MarketQuote; timestamp: number }>();

export async function getQuote(symbol: string): Promise<MarketQuote | null> {
	try {
		// Check cache first
		const cached = priceCache.get(symbol);
		if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
			return cached.data;
		}

		// Add market prefix for different exchanges
		let yahooSymbol = symbol.toUpperCase();
		
		// BIST stocks need .IS suffix
		if (!yahooSymbol.includes('.') && isLikelyBIST(yahooSymbol)) {
			yahooSymbol = `${yahooSymbol}.IS`;
		}

		const quote = await yahooFinance.quote(yahooSymbol);
		
		if (!quote || quote.price === undefined) {
			return null;
		}

		const marketQuote: MarketQuote = {
			symbol: symbol.toUpperCase(),
			name: quote.shortName || quote.longName || symbol,
			price: quote.price || 0,
			currency: quote.currency || 'USD',
			change: quote.change || 0,
			changePercent: quote.changePercent || 0,
			volume: quote.volume,
			avgVolume: quote.averageVolume,
			marketCap: quote.marketCap,
			peRatio: quote.trailingPE,
			fiftyTwoWeekHigh: quote.fiftyTwoWeekHigh,
			fiftyTwoWeekLow: quote.fiftyTwoWeekLow,
			fiftyDayAvg: quote.fiftyDayAverage,
			twoHundredDayAvg: quote.twoHundredDayAverage,
			open: quote.open,
			previousClose: quote.previousClose,
			dayHigh: quote.dayHigh,
			dayLow: quote.dayLow,
			exchange: quote.exchange || 'Unknown',
			quoteType: quote.quoteType || 'EQUITY',
			timestamp: Date.now()
		};

		// Update cache
		priceCache.set(symbol, { data: marketQuote, timestamp: Date.now() });

		return marketQuote;
	} catch (error) {
		console.error(`Yahoo Finance error for ${symbol}:`, error);
		return null;
	}
}

export async function getQuotes(symbols: string[]): Promise<MarketQuote[]> {
	const quotes: MarketQuote[] = [];
	
	for (const symbol of symbols) {
		const quote = await getQuote(symbol);
		if (quote) {
			quotes.push(quote);
		}
	}
	
	return quotes;
}

export async function getHistoricalPrices(
	symbol: string,
	startDate: Date,
	endDate: Date,
	interval: '1d' | '1wk' | '1mo' = '1d'
): Promise<HistoricalPrice[]> {
	try {
		let yahooSymbol = symbol.toUpperCase();
		
		if (!yahooSymbol.includes('.') && isLikelyBIST(yahooSymbol)) {
			yahooSymbol = `${yahooSymbol}.IS`;
		}

		const result = await yahooFinance.historical(yahooSymbol, {
			period1: startDate,
			period2: endDate,
			interval
		});

		if (!result || result.length === 0) {
			return [];
		}

		return result.map(item => ({
			symbol: symbol.toUpperCase(),
			date: new Date(item.date).toISOString().split('T')[0],
			open: item.open || 0,
			high: item.high || 0,
			low: item.low || 0,
			close: item.close || 0,
			volume: item.volume || 0,
			adjClose: item.adjClose
		}));
	} catch (error) {
		console.error(`Historical prices error for ${symbol}:`, error);
		return [];
	}
}

export async function searchSymbols(query: string): Promise<SearchResult[]> {
	try {
		const result = await yahooFinance.search(query);
		
		return result.quotes.map(item => ({
			symbol: item.symbol,
			name: item.shortname || item.longname || '',
			exchange: item.exchange || '',
			type: item.quoteType || 'EQUITY'
		}));
	} catch (error) {
		console.error('Search error:', error);
		return [];
	}
}

function isLikelyBIST(symbol: string): void {
	// BIST stocks are typically alphanumeric codes like THYAO, SASA, etc.
	// Turkish stocks are usually 4-5 letter codes without numbers
	const bistPattern = /^[A-Z]{4,5}$/;
	return bistPattern.test(symbol);
}

export function clearCache(): void {
	priceCache.clear();
}

export function getCacheStats(): { size: number; symbols: string[] } {
	return {
		size: priceCache.size,
		symbols: Array.from(priceCache.keys())
	};
}