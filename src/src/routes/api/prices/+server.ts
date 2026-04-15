import { json } from '@sveltejs/kit';
import { getQuote, getQuotes } from '$lib/server/services/yahooFinance';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const symbol = url.searchParams.get('symbol');
	const symbols = url.searchParams.get('symbols');
	
	try {
		if (symbols) {
			const symbolList = symbols.split(',').map(s => s.trim());
			const quotes = await getQuotes(symbolList);
			return json({ success: true, data: quotes });
		}
		
		if (symbol) {
			const quote = await getQuote(symbol);
			if (!quote) {
				return json({ success: false, error: 'Quote not found' }, { status: 404 });
			}
			return json({ success: true, data: quote });
		}
		
		return json({ success: false, error: 'Symbol required' }, { status: 400 });
	} catch (error) {
		return json({ 
			success: false, 
			error: error instanceof Error ? error.message : 'Unknown error' 
		}, { status: 500 });
	}
};