export interface TefasFund {
	code: string;
	name: string;
	shortName?: string;
	price: number;
	previousPrice?: number;
	dailyReturn?: number;
	portfolioSize?: number;
	investorCount?: number;
	shareCount?: number;
	date: string;
	fundType: 'YAT' | 'EMK';
}

export interface TefasFundHistory {
	code: string;
	date: string;
	price: number;
	dailyReturn?: number;
	portfolioSize?: number;
	investorCount?: number;
}

export type TefasFundTypeCode = 0 | 1;

export interface TefasApiResponse {
	draw?: number;
	recordsTotal?: number;
	recordsFiltered?: number;
	data?: TefasRawRow[];
}

export interface TefasRawRow {
	TARIH?: string | number | null;
	FONKODU?: string | null;
	FONUNVAN?: string | null;
	FIYAT?: number | string | null;
	TEDPAYSAYISI?: number | string | null;
	KISISAYISI?: number | string | null;
	PORTFOYBUYUKLUK?: number | string | null;
}