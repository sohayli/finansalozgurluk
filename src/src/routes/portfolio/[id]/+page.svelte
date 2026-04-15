<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabase';
	import { page } from '$app/state';
	
	let portfolio = $state<any>(null);
	let assets = $state<any[]>([]);
	let loading = $state(true);
	let error = $state('');
	let showAddAssetModal = $state(false);
	let refreshingPrices = $state(false);
	
	let newAsset = $state({
		symbol: '',
		name: '',
		type: 'stock',
		market: 'bist',
		quantity: 0,
		buy_price: 0,
		buy_currency: 'TRY'
	});
	
	const assetTypes = [
		{ value: 'stock', label: 'Hisse Senedi' },
		{ value: 'crypto', label: 'Kripto Para' },
		{ value: 'fund', label: 'Yatırım Fonu' },
		{ value: 'gold', label: 'Altın' },
		{ value: 'forex', label: 'Döviz' },
		{ value: 'cash', label: 'Nakit' }
	];
	
	const markets = [
		{ value: 'bist', label: 'Borsa İstanbul' },
		{ value: 'nasdaq', label: 'NASDAQ' },
		{ value: 'nyse', label: 'NYSE' },
		{ value: 'crypto', label: 'Kripto' },
		{ value: 'forex', label: 'Döviz' }
	];
	
	onMount(async () => {
		const portfolioId = page.params.id;
		if (!portfolioId) {
			goto('/portfolio');
			return;
		}
		
		await loadPortfolio(portfolioId);
		await loadAssets(portfolioId);
	});
	
	async function loadPortfolio(id: string) {
		const { data, err } = await supabase
			.from('portfolios')
			.select('*')
			.eq('id', id)
			.single();
		
		if (err) {
			error = err.message;
			goto('/portfolio');
		} else {
			portfolio = data;
		}
	}
	
	async function loadAssets(portfolioId: string) {
		loading = true;
		
		const { data, err } = await supabase
			.from('assets')
			.select('*')
			.eq('portfolio_id', portfolioId)
			.order('created_at', { ascending: false });
		
		if (err) {
			error = err.message;
		} else {
			assets = data || [];
		}
		
		loading = false;
	}
	
	async function createAsset(e: Event) {
		e.preventDefault();
		
		if (!newAsset.symbol || !newAsset.name || newAsset.quantity <= 0) {
			error = 'Sembol, ad ve miktar gerekli';
			return;
		}
		
		loading = true;
		error = '';
		
		const { data, err } = await supabase
			.from('assets')
			.insert({
				...newAsset,
				portfolio_id: portfolio.id,
				current_price: newAsset.buy_price,
				current_currency: newAsset.buy_currency
			})
			.select()
			.single();
		
		if (err) {
			error = err.message;
		} else {
			assets = [...assets, data];
			showAddAssetModal = false;
			newAsset = {
				symbol: '',
				name: '',
				type: 'stock',
				market: 'bist',
				quantity: 0,
				buy_price: 0,
				buy_currency: 'TRY'
			};
		}
		
		loading = false;
	}
	
	async function deleteAsset(id: string) {
		if (!confirm('Bu varlığı silmek istediğinize emin misiniz?')) return;
		
		const { err } = await supabase
			.from('assets')
			.delete()
			.eq('id', id);
		
		if (err) {
			error = err.message;
		} else {
			assets = assets.filter(a => a.id !== id);
		}
	}
	
	async function refreshPrices() {
		refreshingPrices = true;
		error = '';
		
		for (const asset of assets) {
			try {
				let priceEndpoint = '/api/prices/stock/' + asset.symbol;
				
				if (asset.type === 'crypto') {
					priceEndpoint = '/api/prices/crypto/' + asset.symbol;
				}
				
				const response = await fetch(priceEndpoint);
				const result = await response.json();
				
				if (result.success && result.data) {
					const quote = result.data;
					
					// Convert USD to TRY if needed (simple conversion)
					let currentPrice = quote.price;
					let currentCurrency = quote.currency;
					
					// Update asset in database
					const { err } = await supabase
						.from('assets')
						.update({
							current_price: currentPrice,
							current_currency: currentCurrency,
							name: quote.name || asset.name
						})
						.eq('id', asset.id);
					
					if (!err) {
						// Update local state
						assets = assets.map(a => 
							a.id === asset.id 
								? { ...a, current_price: currentPrice, current_currency: currentCurrency }
								: a
						);
					}
				}
			} catch (err) {
				console.error(`Failed to refresh ${asset.symbol}:`, err);
			}
		}
		
		refreshingPrices = false;
	}
	
	function calculateTotalValue() {
		return assets.reduce((sum, asset) => {
			const price = asset.current_price || asset.buy_price;
			return sum + (price * asset.quantity);
		}, 0);
	}
	
	function calculateTotalInvested() {
		return assets.reduce((sum, asset) => {
			return sum + (asset.buy_price * asset.quantity);
		}, 0);
	}
	
	function formatCurrency(value: number, currency: string = 'TRY') {
		const symbols = { TRY: '₺', USD: '$', EUR: '€' };
		return `${symbols[currency] || currency}${value.toFixed(2)}`;
	}
</script>

<div class="container mx-auto px-4 py-8">
	{#if loading && !portfolio}
		<div class="flex justify-center py-12">
			<svg class="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
				<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
				<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
			</svg>
		</div>
	{:else if portfolio}
		<header class="mb-8">
			<div class="flex justify-between items-start">
				<div>
					<button onclick={() => goto('/portfolio')} class="text-gray-600 hover:text-gray-800 mb-2 flex items-center gap-1">
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
						</svg>
						Portföyler
					</button>
					<h1 class="text-3xl font-bold text-gray-900">{portfolio.name}</h1>
					{#if portfolio.description}
						<p class="text-gray-600 mt-1">{portfolio.description}</p>
					{/if}
				</div>
				
				<button
					class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
					onclick={() => showAddAssetModal = true}
				>
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
					</svg>
					Varlık Ekle
				</button>
				
				{#if assets.length > 0}
					<button
						class="ml-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 {refreshingPrices ? 'opacity-50' : ''}"
						onclick={refreshPrices}
						disabled={refreshingPrices}
					>
						{#if refreshingPrices}
							<svg class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
								<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
								<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
							</svg>
							Güncelleniyor...
						{:else}
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
							</svg>
							Fiyatları Güncelle
						{/if}
					</button>
				{/if}
			</div>
			
			{#if error}
				<div class="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
					{error}
				</div>
			{/if}
		</header>
		
		<!-- Portfolio Summary -->
		<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
			<div class="bg-white rounded-lg shadow p-6">
				<h3 class="text-sm font-medium text-gray-500 mb-2">Toplam Değer</h3>
				<p class="text-2xl font-bold text-gray-900">{formatCurrency(calculateTotalValue(), portfolio.currency)}</p>
			</div>
			
			<div class="bg-white rounded-lg shadow p-6">
				<h3 class="text-sm font-medium text-gray-500 mb-2">Yatırılan Tutar</h3>
				<p class="text-2xl font-bold text-gray-900">{formatCurrency(calculateTotalInvested(), portfolio.currency)}</p>
			</div>
			
			<div class="bg-white rounded-lg shadow p-6">
				<h3 class="text-sm font-medium text-gray-500 mb-2">Kar/Zarar</h3>
				<p class="text-2xl font-bold {calculateTotalValue() >= calculateTotalInvested() ? 'text-green-600' : 'text-red-600'}">
					{formatCurrency(calculateTotalValue() - calculateTotalInvested(), portfolio.currency)}
				</p>
			</div>
		</div>
		
		<!-- Assets Table -->
		<div class="bg-white rounded-lg shadow">
			<div class="p-6 border-b">
				<h2 class="text-xl font-semibold text-gray-900">Varlıklar ({assets.length})</h2>
			</div>
			
			{#if assets.length === 0}
				<div class="p-12 text-center">
					<svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
					</svg>
					<h3 class="text-xl font-semibold text-gray-700 mb-2">Henüz varlık yok</h3>
					<p class="text-gray-500 mb-4">Portföye hisse, kripto veya fon ekleyin</p>
					<button
						class="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
						onclick={() => showAddAssetModal = true}
					>
						İlk Varlığı Ekle
					</button>
				</div>
			{:else}
				<div class="overflow-x-auto">
					<table class="w-full">
						<thead class="bg-gray-50">
							<tr>
								<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Varlık</th>
								<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tip</th>
								<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Miktar</th>
								<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Alış Fiyatı</th>
								<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Güncel Değer</th>
								<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kar/Zarar</th>
								<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">İşlemler</th>
							</tr>
						</thead>
						<tbody class="divide-y divide-gray-200">
							{#each assets as asset (asset.id)}
								{@const currentValue = (asset.current_price || asset.buy_price) * asset.quantity}
								{@const investedValue = asset.buy_price * asset.quantity}
								<tr>
									<td class="px-6 py-4 whitespace-nowrap">
										<div>
											<div class="font-medium text-gray-900">{asset.symbol}</div>
											<div class="text-sm text-gray-500">{asset.name}</div>
										</div>
									</td>
									<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{assetTypes.find(t => t.value === asset.type)?.label || asset.type}
									</td>
									<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
										{asset.quantity}
									</td>
									<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
										{formatCurrency(asset.buy_price, asset.buy_currency)}
									</td>
									<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
										{formatCurrency(currentValue, asset.current_currency)}
									</td>
									<td class="px-6 py-4 whitespace-nowrap text-sm font-medium {currentValue >= investedValue ? 'text-green-600' : 'text-red-600'}">
										{formatCurrency(currentValue - investedValue, asset.current_currency)}
									</td>
									<td class="px-6 py-4 whitespace-nowrap text-sm">
										<button
											class="text-red-600 hover:text-red-800"
											onclick={() => deleteAsset(asset.id)}
										>
											Sil
										</button>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			{/if}
		</div>
	{/if}
	
	<!-- Add Asset Modal -->
	{#if showAddAssetModal}
		<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onclick={() => showAddAssetModal = false}>
			<div class="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4" onclick={(e) => e.stopPropagation()}>
				<div class="p-6">
					<h2 class="text-2xl font-bold mb-6">Varlık Ekle</h2>
					
					<form onsubmit={createAsset}>
						<div class="space-y-4">
							<div class="grid grid-cols-2 gap-4">
								<div>
									<label class="block text-sm font-medium text-gray-700 mb-1">Sembol</label>
									<input
										type="text"
										class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
										placeholder="Örn: THYAO, BTC"
										bind:value={newAsset.symbol}
										required
									/>
								</div>
								
								<div>
									<label class="block text-sm font-medium text-gray-700 mb-1">Ad</label>
									<input
										type="text"
										class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
										placeholder="Örn: Türk Hava Yolları"
										bind:value={newAsset.name}
										required
									/>
								</div>
							</div>
							
							<div class="grid grid-cols-2 gap-4">
								<div>
									<label class="block text-sm font-medium text-gray-700 mb-1">Varlık Tipi</label>
									<select
										class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
										bind:value={newAsset.type}
									>
										{#each assetTypes as type}
											<option value={type.value}>{type.label}</option>
										{/each}
									</select>
								</div>
								
								<div>
									<label class="block text-sm font-medium text-gray-700 mb-1">Piyasa</label>
									<select
										class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
										bind:value={newAsset.market}
									>
										{#each markets as market}
											<option value={market.value}>{market.label}</option>
										{/each}
									</select>
								</div>
							</div>
							
							<div class="grid grid-cols-3 gap-4">
								<div>
									<label class="block text-sm font-medium text-gray-700 mb-1">Miktar</label>
									<input
										type="number"
										step="0.001"
										min="0"
										class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
										placeholder="100"
										bind:value={newAsset.quantity}
										required
									/>
								</div>
								
								<div>
									<label class="block text-sm font-medium text-gray-700 mb-1">Alış Fiyatı</label>
									<input
										type="number"
										step="0.01"
										min="0"
										class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
										placeholder="150.50"
										bind:value={newAsset.buy_price}
										required
									/>
								</div>
								
								<div>
									<label class="block text-sm font-medium text-gray-700 mb-1">Para Birimi</label>
									<select
										class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
										bind:value={newAsset.buy_currency}
									>
										<option value="TRY">TRY (₺)</option>
										<option value="USD">USD ($)</option>
										<option value="EUR">EUR (€)</option>
									</select>
								</div>
							</div>
						</div>
						
						<div class="flex gap-3 mt-6">
							<button
								type="button"
								class="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
								onclick={() => showAddAssetModal = false}
							>
								İptal
							</button>
							<button
								type="submit"
								class="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
								disabled={loading}
							>
								{#if loading}Ekleniyor...{:else}Ekle{/if}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	{/if}
</div>