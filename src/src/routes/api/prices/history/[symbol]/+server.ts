import { json } from '@sveltejs/kit';
import { getHistoricalPrices } from '$lib/server/services/yahooFinance';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, url }) => {
	const symbol = params.symbol;
	
	const start = url.searchParams.get('start');
	const end = url.searchParams.get('end');
	const interval = url.searchParams.get('interval') as '1d' | '1wk' | '1mo' || '1d';
	
	try {
		// Default: last 30 days if not specified
		const startDate = start ? new Date(start) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
		const endDate = end ? new Date(end) : new Date();
		
		const prices = await getHistoricalPrices(symbol, startDate, endDate, interval);
		
		if (prices.length === 0) {
			return json({ 
				success: false, 
				error: `No historical data found for ${symbol}` 
			}, { status: 404 });
		}
		
		return json({ success: true, data: prices });
	} catch (error) {
		return json({ 
			success: false, 
			error: error instanceof Error ? error.message : 'Unknown error' 
		}, { status: 500 });
	}
};