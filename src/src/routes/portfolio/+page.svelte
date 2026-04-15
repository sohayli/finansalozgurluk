<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabase';
	import { Card, CardContent, Button, Input, Label, Select } from '$lib/components';
	
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
</script>

<div class="section">
	<header class="mb-8">
		<div class="flex justify-between items-center">
			<div>
				<h1 class="text-4xl font-bold tracking-tight">Portföylerim</h1>
				<p class="text-muted text-lg mt-2">Yatırım portföylerini yönetin</p>
			</div>
			<Button onclick={() => showAddModal = true}>
				<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
				</svg>
				Yeni Portföy
			</Button>
		</div>
		
		{#if error}
			<div class="mt-4 alert alert-destructive">
				{error}
			</div>
		{/if}
	</header>
	
	{#if loading}
		<div class="flex justify-center py-12">
			<svg class="animate-spin h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24">
				<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
				<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
			</svg>
		</div>
	{:else if portfolios.length === 0}
		<Card class="text-center animate-fade-up">
			<CardContent class="p-12">
				<svg class="w-16 h-16 text-muted mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
				</svg>
				<h3 class="text-xl font-semibold mb-2">Henüz portföyünüz yok</h3>
				<p class="text-muted mb-4">Yatırım portföyünü oluşturun ve takibe başlayın</p>
				<Button onclick={() => showAddModal = true}>
					İlk Portföyü Oluştur
				</Button>
			</CardContent>
		</Card>
	{:else}
		<div class="grid-cards">
			{#each portfolios as portfolio (portfolio.id)}
				<a href="/portfolio/{portfolio.id}">
					<Card class="animate-fade-up">
						<CardContent class="p-6">
							<div class="flex justify-between items-start mb-4">
								<h3 class="text-xl font-semibold">{portfolio.name}</h3>
								<span class="badge badge-outline">{portfolio.currency}</span>
							</div>
							
							{#if portfolio.description}
								<p class="text-muted mb-4">{portfolio.description}</p>
							{/if}
							
							<div class="flex justify-between items-center text-sm">
								<span class="text-muted">
									{new Date(portfolio.created_at).toLocaleDateString('tr-TR')}
								</span>
								<Button 
									variant="destructive" 
									size="sm"
									onclick={(e) => { e.preventDefault(); e.stopPropagation(); deletePortfolio(portfolio.id); }}
								>
									Sil
								</Button>
							</div>
						</CardContent>
					</Card>
				</a>
			{/each}
		</div>
	{/if}
	
	{#if showAddModal}
		<div class="modal-backdrop" onclick={() => showAddModal = false}>
			<Card class="modal-content" onclick={(e) => e.stopPropagation()}>
				<CardContent class="p-6">
					<h2 class="text-2xl font-bold mb-6">Yeni Portföy Oluştur</h2>
					
					<form onsubmit={createPortfolio} class="space-y-4">
						<div>
							<Label for="name">Portföy Adı</Label>
							<Input 
								id="name"
								placeholder="Örn: Ana Portföy, Emeklilik Fonu"
								bind:value={newPortfolio.name}
								required
							/>
						</div>
						
						<div>
							<Label for="desc">Açıklama</Label>
							<textarea
								id="desc"
								class="input"
								placeholder="Portföy hakkında kısa açıklama"
								bind:value={newPortfolio.description}
								rows="3"
							></textarea>
						</div>
						
						<div>
							<Label for="currency">Para Birimi</Label>
							<Select id="currency" bind:value={newPortfolio.currency}>
								<option value="TRY">Türk Lirası (₺)</option>
								<option value="USD">US Dollar ($)</option>
								<option value="EUR">Euro (€)</option>
							</Select>
						</div>
						
						<div class="flex gap-3 mt-6">
							<Button type="button" variant="outline" onclick={() => showAddModal = false} class="flex-1">
								İptal
							</Button>
							<Button type="submit" disabled={loading} class="flex-1">
								{#if loading}Oluşturuyor...{:else}Oluştur{/if}
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	{/if}
</div>