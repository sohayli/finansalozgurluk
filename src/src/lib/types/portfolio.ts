export interface Portfolio {
	id: string;
	user_id: string;
	name: string;
	description?: string;
	currency: string;
	target_value?: number;
	target_date?: string;
	created_at: string;
	updated_at: string;
}

export interface Asset {
	id: string;
	portfolio_id: string;
	symbol: string;
	name: string;
	type: 'stock' | 'crypto' | 'fund' | 'cash' | 'gold' | 'forex';
	market: 'bist' | 'nasdaq' | 'nyse' | 'crypto' | 'forex';
	quantity: number;
	buy_price: number;
	buy_currency: string;
	current_price?: number;
	current_currency: string;
	sector?: string;
	created_at: string;
	updated_at: string;
}

export interface Transaction {
	id: string;
	asset_id: string;
	type: 'buy' | 'sell' | 'dividend' | 'split';
	quantity: number;
	price: number;
	currency: string;
	date: string;
	fee: number;
	notes?: string;
	created_at: string;
}

export interface PortfolioSummary {
	total_value: number;
	total_invested: number;
	profit_loss: number;
	profit_loss_percent: number;
	asset_count: number;
	assets_by_type: Record<string, number>;
}

export type PortfolioInsert = Omit<Portfolio, 'id' | 'user_id' | 'created_at' | 'updated_at'>;
export type AssetInsert = Omit<Asset, 'id' | 'created_at' | 'updated_at'>;
export type TransactionInsert = Omit<Transaction, 'id' | 'created_at'>;