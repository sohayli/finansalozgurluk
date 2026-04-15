import { json } from '@sveltejs/kit';
import { fetchAllTefasFunds, fetchTefasFunds } from '$lib/server/services/tefas';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const fundType = url.searchParams.get('type');
	const dateStr = url.searchParams.get('date');
	
	try {
		let funds;
		
		if (fundType === 'investment' || fundType === '0') {
			funds = await fetchTefasFunds({ fundTypeCode: 0 });
		} else if (fundType === 'pension' || fundType === '1') {
			funds = await fetchTefasFunds({ fundTypeCode: 1 });
		} else {
			funds = await fetchAllTefasFunds();
		}
		
		return json({ 
			success: true, 
			data: funds,
			count: funds.length,
			timestamp: new Date().toISOString()
		});
	} catch (error) {
		return json({ 
			success: false, 
			error: error instanceof Error ? error.message : 'TEFAS fetch failed' 
		}, { status: 500 });
	}
};