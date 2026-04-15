<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabase';
	
	let portfolios = $state<any[]>([]);
	let loading = $state(true);
	let showAddModal = $state(false);
	let error = $state('');
	
	let newPortfolio = $state({
		name: '',
		description: '',
		currency: 'TRY'
	});
	
	onMount(async () => {
		await loadPortfolios();
	});
	
	async function loadPortfolios() {
		loading = true;
		error = '';
		
		const { data: { user } } = await supabase.auth.getUser();
		if (!user) {
			goto('/login');
			return;
		}
		
		const { data, err } = await supabase
			.from('portfolios')
			.select('*')
			.order('created_at', { ascending: false });
		
		if (err) {
			error = err.message;
		} else {
			portfolios = data || [];
		}
		
		loading = false;
	}
	
	async function createPortfolio(e: Event) {
		e.preventDefault();
		
		if (!newPortfolio.name) {
			error = 'Portföy adı gerekli';
			return;
		}
		
		loading = true;
		error = '';
		
		const { data: { user } } = await supabase.auth.getUser();
		if (!user) return;
		
		const { data, err } = await supabase
			.from('portfolios')
			.insert({ ...newPortfolio, user_id: user.id })
			.select()
			.single();
		
		if (err) {
			error = err.message;
		} else {
			portfolios = [...portfolios, data];
			showAddModal = false;
			newPortfolio = { name: '', description: '', currency: 'TRY' };
		}
		
		loading = false;
	}
	
	async function deletePortfolio(id: string) {
		if (!confirm('Bu portföyü silmek istediğinize emin misiniz?')) return;
		
		const { err } = await supabase
			.from('portfolios')
			.delete()
			.eq('id', id);
		
		if (err) {
			error = err.message;
		} else {
			portfolios = portfolios.filter(p => p.id !== id);
		}
	}
	
	function openPortfolio(id: string) {
		goto(`/portfolio/${id}`);
	}
</script>

<div class="container mx-auto px-4 py-8">
	<header class="mb-8">
		<div class="flex justify-between items-center">
			<div>
				<h1 class="text-3xl font-bold text-gray-900">Portföylerim</h1>
				<p class="text-gray-600 mt-1">Yatırım portföylerini yönetin</p>
			</div>
			<button
				class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
				onclick={() => showAddModal = true}
			>
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
				</svg>
				Yeni Portföy
			</button>
		</div>
		
		{#if error}
			<div class="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
				{error}
			</div>
		{/if}
	</header>
	
	{#if loading}
		<div class="flex justify-center py-12">
			<svg class="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
				<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
				<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
			</svg>
		</div>
	{:else if portfolios.length === 0}
		<div class="bg-white rounded-lg shadow p-12 text-center">
			<svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
			</svg>
			<h3 class="text-xl font-semibold text-gray-700 mb-2">Henüz portföyünüz yok</h3>
			<p class="text-gray-500 mb-4">Yatırım portföyünü oluşturun ve takibe başlayın</p>
			<button
				class="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
				onclick={() => showAddModal = true}
			>
				İlk Portföyü Oluştur
			</button>
		</div>
	{:else}
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each portfolios as portfolio (portfolio.id)}
				<div class="bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer" onclick={() => openPortfolio(portfolio.id)}>
					<div class="p-6">
						<div class="flex justify-between items-start mb-4">
							<h3 class="text-xl font-semibold text-gray-900">{portfolio.name}</h3>
							<span class="text-sm text-gray-500">{portfolio.currency}</span>
						</div>
						
						{#if portfolio.description}
							<p class="text-gray-600 mb-4">{portfolio.description}</p>
						{/if}
						
						<div class="flex justify-between items-center text-sm text-gray-500">
							<span>Oluşturulma: {new Date(portfolio.created_at).toLocaleDateString('tr-TR')}</span>
							<button
								class="text-red-600 hover:text-red-800"
								onclick={(e) => { e.stopPropagation(); deletePortfolio(portfolio.id); }}
							>
								Sil
							</button>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
	
	<!-- Add Portfolio Modal -->
	{#if showAddModal}
		<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onclick={() => showAddModal = false}>
			<div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4" onclick={(e) => e.stopPropagation()}>
				<div class="p-6">
					<h2 class="text-2xl font-bold mb-6">Yeni Portföy Oluştur</h2>
					
					<form onsubmit={createPortfolio}>
						<div class="space-y-4">
							<div>
								<label class="block text-sm font-medium text-gray-700 mb-1">Portföy Adı</label>
								<input
									type="text"
									class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
									placeholder="Örn: Ana Portföy, Emeklilik Fonu"
									bind:value={newPortfolio.name}
									required
								/>
							</div>
							
							<div>
								<label class="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
								<textarea
									class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
									placeholder="Portföy hakkında kısa açıklama"
									bind:value={newPortfolio.description}
									rows="3"
								></textarea>
							</div>
							
							<div>
								<label class="block text-sm font-medium text-gray-700 mb-1">Para Birimi</label>
								<select
									class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
									bind:value={newPortfolio.currency}
								>
									<option value="TRY">Türk Lirası (₺)</option>
									<option value="USD">US Dollar ($)</option>
									<option value="EUR">Euro (€)</option>
								</select>
							</div>
						</div>
						
						<div class="flex gap-3 mt-6">
							<button
								type="button"
								class="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
								onclick={() => showAddModal = false}
							>
								İptal
							</button>
							<button
								type="submit"
								class="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
								disabled={loading}
							>
								{#if loading}Oluşturuyor...{:else}Oluştur{/if}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	{/if}
</div>