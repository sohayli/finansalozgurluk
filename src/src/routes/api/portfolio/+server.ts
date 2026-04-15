import { json } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';
import type { RequestHandler } from './$types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const GET: RequestHandler = async ({ cookies }) => {
	const supabase = createClient(supabaseUrl, supabaseAnonKey);
	
	const sessionCookie = cookies.get('sb-session');
	if (sessionCookie) {
		const session = JSON.parse(sessionCookie);
		await supabase.auth.setSession(session);
	}
	
	const { data: { user } } = await supabase.auth.getUser();
	if (!user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}
	
	const { data, error } = await supabase
		.from('portfolios')
		.select('*')
		.eq('user_id', user.id)
		.order('created_at', { ascending: false });
	
	if (error) {
		return json({ error: error.message }, { status: 500 });
	}
	
	return json(data);
};

export const POST: RequestHandler = async ({ request, cookies }) => {
	const supabase = createClient(supabaseUrl, supabaseAnonKey);
	
	const sessionCookie = cookies.get('sb-session');
	if (sessionCookie) {
		const session = JSON.parse(sessionCookie);
		await supabase.auth.setSession(session);
	}
	
	const { data: { user } } = await supabase.auth.getUser();
	if (!user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}
	
	const body = await request.json();
	
	const { data, error } = await supabase
		.from('portfolios')
		.insert({ ...body, user_id: user.id })
		.select()
		.single();
	
	if (error) {
		return json({ error: error.message }, { status: 500 });
	}
	
	return json(data);
};