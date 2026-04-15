import { json } from '@sveltejs/kit';
import { getQuote } from '$lib/server/services/yahooFinance';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	const symbol = params.symbol;
	
	try {
		const quote = await getQuote(symbol);
		
		if (!quote) {
			return json({ 
				success: false, 
				error: `No quote found for ${symbol}` 
			}, { status: 404 });
		}
		
		return json({ success: true, data: quote });
	} catch (error) {
		return json({ 
			success: false, 
			error: error instanceof Error ? error.message : 'Unknown error' 
		}, { status: 500 });
	}
};