import { json } from '@sveltejs/kit';
import { fetchTefasFundHistory } from '$lib/server/services/tefas';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, url }) => {
	const code = params.code.toUpperCase();
	
	const fromStr = url.searchParams.get('from');
	const toStr = url.searchParams.get('to');
	const typeStr = url.searchParams.get('type');
	
	const fromDate = fromStr ? new Date(fromStr) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
	const toDate = toStr ? new Date(toStr) : new Date();
	const fundTypeCode = typeStr === 'pension' || typeStr === '1' ? 1 : 0;
	
	try {
		const history = await fetchTefasFundHistory(code, {
			fundTypeCode,
			fromDate,
			toDate
		});
		
		if (history.length === 0) {
			return json({ 
				success: false, 
				error: `No history found for fund ${code}` 
			}, { status: 404 });
		}
		
		const latest = history[0];
		
		return json({ 
			success: true, 
			data: {
				code: latest.code,
				price: latest.price,
				date: latest.date,
				dailyReturn: latest.dailyReturn,
				history
			}
		});
	} catch (error) {
		return json({ 
			success: false, 
			error: error instanceof Error ? error.message : 'TEFAS fetch failed' 
		}, { status: 500 });
	}
};