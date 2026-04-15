import { json } from '@sveltejs/kit';
import { getQuote } from '$lib/server/services/yahooFinance';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	const symbol = params.symbol.toUpperCase();
	
	try {
		// Crypto symbols on Yahoo Finance: BTC-USD, ETH-USD, etc.
		let yahooSymbol = symbol;
		if (!symbol.includes('-')) {
			// Assume USD pairing if not specified
			yahooSymbol = `${symbol}-USD`;
		}
		
		const quote = await getQuote(yahooSymbol);
		
		if (!quote) {
			return json({ 
				success: false, 
				error: `No quote found for ${symbol}` 
			}, { status: 404 });
		}
		
		return json({ 
			success: true, 
			data: {
				...quote,
				symbol: symbol // Return original symbol without suffix
			}
		});
	} catch (error) {
		return json({ 
			success: false, 
			error: error instanceof Error ? error.message : 'Unknown error' 
		}, { status: 500 });
	}
};