import { json } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';
import type { RequestHandler } from './$types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const GET: RequestHandler = async ({ params, cookies }) => {
	const supabase = createClient(supabaseUrl, supabaseAnonKey);
	
	const sessionCookie = cookies.get('sb-session');
	if (sessionCookie) {
		const session = JSON.parse(sessionCookie);
		await supabase.auth.setSession(session);
	}
	
	const { data, error } = await supabase
		.from('portfolios')
		.select(`
			*,
			assets (
				id, symbol, name, type, market, quantity, buy_price, current_price
			)
		`)
		.eq('id', params.id)
		.single();
	
	if (error) {
		return json({ error: error.message }, { status: 500 });
	}
	
	return json(data);
};

export const PATCH: RequestHandler = async ({ params, request, cookies }) => {
	const supabase = createClient(supabaseUrl, supabaseAnonKey);
	
	const sessionCookie = cookies.get('sb-session');
	if (sessionCookie) {
		const session = JSON.parse(sessionCookie);
		await supabase.auth.setSession(session);
	}
	
	const body = await request.json();
	
	const { data, error } = await supabase
		.from('portfolios')
		.update(body)
		.eq('id', params.id)
		.select()
		.single();
	
	if (error) {
		return json({ error: error.message }, { status: 500 });
	}
	
	return json(data);
};

export const DELETE: RequestHandler = async ({ params, cookies }) => {
	const supabase = createClient(supabaseUrl, supabaseAnonKey);
	
	const sessionCookie = cookies.get('sb-session');
	if (sessionCookie) {
		const session = JSON.parse(sessionCookie);
		await supabase.auth.setSession(session);
	}
	
	const { error } = await supabase
		.from('portfolios')
		.delete()
		.eq('id', params.id);
	
	if (error) {
		return json({ error: error.message }, { status: 500 });
	}
	
	return json({ success: true });
};