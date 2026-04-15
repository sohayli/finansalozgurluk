import { writable, derived } from 'svelte/store';
import { supabase } from '$lib/supabase';
import type { Portfolio, Asset, PortfolioSummary } from '$lib/types/portfolio';

export const portfolios = writable<Portfolio[]>([]);
export const activePortfolio = writable<Portfolio | null>(null);
export const assets = writable<Asset[]>([]);
export const loading = writable(false);
export const error = writable<string | null>(null);

export const portfolioSummary = derived(
	[portfolios, assets],
	([$portfolios, $assets]) => {
		const summary: PortfolioSummary = {
			total_value: 0,
			total_invested: 0,
			profit_loss: 0,
			profit_loss_percent: 0,
			asset_count: $assets.length,
			assets_by_type: {}
		};

		$assets.forEach(asset => {
			const currentPrice = asset.current_price || asset.buy_price;
			summary.total_value += currentPrice * asset.quantity;
			summary.total_invested += asset.buy_price * asset.quantity;
			summary.assets_by_type[asset.type] = (summary.assets_by_type[asset.type] || 0) + 1;
		});

		summary.profit_loss = summary.total_value - summary.total_invested;
		if (summary.total_invested > 0) {
			summary.profit_loss_percent = (summary.profit_loss / summary.total_invested) * 100;
		}

		return summary;
	}
);

export async function loadPortfolios() {
	loading.set(true);
	error.set(null);

	const { data, error: err } = await supabase
		.from('portfolios')
		.select('*')
		.order('created_at', { ascending: false });

	if (err) {
		error.set(err.message);
	} else {
		portfolios.set(data || []);
	}

	loading.set(false);
}

export async function createPortfolio(portfolio: PortfolioInsert) {
	loading.set(true);
	error.set(null);

	const { data: { user } } = await supabase.auth.getUser();
	if (!user) {
		error.set('Not authenticated');
		loading.set(false);
		return null;
	}

	const { data, error: err } = await supabase
		.from('portfolios')
		.insert({ ...portfolio, user_id: user.id })
		.select()
		.single();

	if (err) {
		error.set(err.message);
	} else {
		portfolios.update(p => [...p, data]);
	}

	loading.set(false);
	return data;
}

export async function updatePortfolio(id: string, updates: Partial<Portfolio>) {
	loading.set(true);
	error.set(null);

	const { data, error: err } = await supabase
		.from('portfolios')
		.update(updates)
		.eq('id', id)
		.select()
		.single();

	if (err) {
		error.set(err.message);
	} else {
		portfolios.update(p => p.map(item => item.id === id ? data : item));
	}

	loading.set(false);
	return data;
}

export async function deletePortfolio(id: string) {
	loading.set(true);
	error.set(null);

	const { error: err } = await supabase
		.from('portfolios')
		.delete()
		.eq('id', id);

	if (err) {
		error.set(err.message);
	} else {
		portfolios.update(p => p.filter(item => item.id !== id));
	}

	loading.set(false);
}

export async function loadAssets(portfolioId: string) {
	loading.set(true);
	error.set(null);

	const { data, error: err } = await supabase
		.from('assets')
		.select('*')
		.eq('portfolio_id', portfolioId)
		.order('created_at', { ascending: false });

	if (err) {
		error.set(err.message);
	} else {
		assets.set(data || []);
	}

	loading.set(false);
}

export async function createAsset(asset: AssetInsert) {
	loading.set(true);
	error.set(null);

	const { data, error: err } = await supabase
		.from('assets')
		.insert(asset)
		.select()
		.single();

	if (err) {
		error.set(err.message);
	} else {
		assets.update(a => [...a, data]);
	}

	loading.set(false);
	return data;
}

export async function deleteAsset(id: string) {
	loading.set(true);
	error.set(null);

	const { error: err } = await supabase
		.from('assets')
		.delete()
		.eq('id', id);

	if (err) {
		error.set(err.message);
	} else {
		assets.update(a => a.filter(item => item.id !== id));
	}

	loading.set(false);
}