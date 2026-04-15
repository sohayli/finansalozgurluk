export interface MarketQuote {
	symbol: string;
	name: string;
	price: number;
	currency: string;
	change: number;
	changePercent: number;
	volume?: number;
	avgVolume?: number;
	marketCap?: number;
	peRatio?: number;
	fiftyTwoWeekHigh?: number;
	fiftyTwoWeekLow?: number;
	fiftyDayAvg?: number;
	twoHundredDayAvg?: number;
	open?: number;
	previousClose?: number;
	dayHigh?: number;
	dayLow?: number;
	exchange: string;
	quoteType: 'EQUITY' | 'CRYPTOCURRENCY' | 'ETF' | 'MUTUALFUND' | 'CURRENCY' | 'FUTURE' | 'INDEX';
	timestamp: number;
}

export interface HistoricalPrice {
	symbol: string;
	date: string;
	open: number;
	high: number;
	low: number;
	close: number;
	volume: number;
	adjClose?: number;
}

export interface SearchResult {
	symbol: string;
	name: string;
	exchange: string;
	type: string;
}

export type MarketCache = {
	symbol: string;
	market: string;
	name: string;
	price: number;
	currency: string;
	change_percent: number;
	volume?: number;
	high_24h?: number;
	low_24h?: number;
	updated_at: string;
}