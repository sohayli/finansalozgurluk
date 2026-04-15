import { sequence } from '@sveltejs/kit/hooks';
import { supabase } from '$lib/server/supabase';

export const handle = sequence(
	async ({ event, resolve }) => {
		// Get session from cookies
		const session = event.cookies.get('session');
		
		if (session) {
			try {
				const { data } = await supabase.auth.getSession();
				if (data.session) {
					event.locals.user = data.session.user;
				}
			} catch (error) {
				console.error('Auth error:', error);
			}
		}
		
		return resolve(event);
	}
);