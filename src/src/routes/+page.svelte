<script lang="ts">
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabase';
	import { goto } from '$app/navigation';
	import Card from '$lib/components/ui/card/index.svelte';
	import CardContent from '$lib/components/ui/card/content.svelte';
	import Button from '$lib/components/ui/button/index.svelte';
	
	let portfolios = $state<any[]>([]);
	let assets = $state<any[]>([]);
	let loading = $state(true);
	
	onMount(async () => {
		const { data: { session } } = await supabase.auth.getSession();
		if (!session) {
			await goto('/login');
			return;
		}
		
		await loadData();
	});
	
	async function loadData() {
		loading = true;
		
		const { data: portfolioData } = await supabase
			.from('portfolios')
			.select('id, name, currency');
		
		portfolios = portfolioData || [];
		
		if (portfolios.length > 0) {
			const portfolioIds = portfolios.map(p => p.id);
			const { data: assetData } = await supabase
				.from('assets')
				.select('id, portfolio_id, symbol, name, type, quantity, buy_price, current_price, current_currency')
				.in('portfolio_id', portfolioIds);
			
			assets = assetData || [];
		}
		
		loading = false;
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
	
	function getAssetCountByType() {
		const counts: Record<string, number> = {};
		assets.forEach(asset => {
			counts[asset.type] = (counts[asset.type] || 0) + 1;
		});
		return counts;
	}
	
	function formatCurrency(value: number) {
		return `₺${value.toFixed(2)}`;
	}
</script>

<div class="container mx-auto px-4 py-8">
	<header class="mb-8">
		<h1 class="text-3xl font-bold text-foreground">Dashboard</h1>
		<p class="text-muted-foreground mt-1">Portföy takibi ve finansal hedef yönetimi</p>
	</header>
	
	{#if loading}
		<div class="flex justify-center py-12">
			<svg class="animate-spin h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24">
				<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
				<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
			</svg>
		</div>
	{:else}
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
			<Card>
				<CardContent class="p-6">
					<h3 class="text-sm font-medium text-muted-foreground mb-2">Toplam Portföy Değeri</h3>
					<p class="text-2xl font-bold">{formatCurrency(calculateTotalValue())}</p>
					<p class="text-sm mt-1 {calculateTotalValue() >= calculateTotalInvested() ? 'text-green-600' : 'text-red-600'}">
						{#if calculateTotalValue() >= calculateTotalInvested()}
							+{formatCurrency(calculateTotalValue() - calculateTotalInvested())}
						{:else}
							-{formatCurrency(calculateTotalInvested() - calculateTotalValue())}
						{/if}
					</p>
				</CardContent>
			</Card>
			
			<Card>
				<CardContent class="p-6">
					<h3 class="text-sm font-medium text-muted-foreground mb-2">Yatırılan Tutar</h3>
					<p class="text-2xl font-bold">{formatCurrency(calculateTotalInvested())}</p>
					<p class="text-sm text-muted-foreground mt-1">Toplam alış maliyeti</p>
				</CardContent>
			</Card>
			
			<Card>
				<CardContent class="p-6">
					<h3 class="text-sm font-medium text-muted-foreground mb-2">Portföy Sayısı</h3>
					<p class="text-2xl font-bold">{portfolios.length}</p>
					<a href="/portfolio" class="text-sm text-primary hover:underline mt-1 block">
						Portföyleri gör →
					</a>
				</CardContent>
			</Card>
			
			<Card>
				<CardContent class="p-6">
					<h3 class="text-sm font-medium text-muted-foreground mb-2">Aktif Varlıklar</h3>
					<p class="text-2xl font-bold">{assets.length}</p>
					<p class="text-sm text-muted-foreground mt-1">
						{#each Object.entries(getAssetCountByType()) as [type, count]}
							{type}: {count} 
						{/each}
					</p>
				</CardContent>
			</Card>
		</div>
		
		<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
			<div class="lg:col-span-2">
				<h2 class="text-xl font-semibold mb-4">Portföylerim</h2>
				
				{#if portfolios.length === 0}
					<Card>
						<CardContent class="p-6">
							<p class="text-muted-foreground mb-4">Henüz portföyünüz yok. Yeni bir portföy oluşturun.</p>
							<Button variant="default" onclick={() => goto('/portfolio')}>
								Portföy Oluştur
							</Button>
						</CardContent>
					</Card>
				{:else}
					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						{#each portfolios as portfolio (portfolio.id)}
							<a href="/portfolio/{portfolio.id}">
								<Card class="hover:shadow-lg transition-shadow cursor-pointer">
									<CardContent class="p-4">
										<h3 class="font-semibold mb-2">{portfolio.name}</h3>
										<p class="text-sm text-muted-foreground">
											{assets.filter(a => a.portfolio_id === portfolio.id).length} varlık
										</p>
										<p class="text-sm text-primary mt-2">
											Detayları gör →
										</p>
									</CardContent>
								</Card>
							</a>
						{/each}
					</div>
					
					<a href="/portfolio" class="mt-4 text-primary hover:underline block">
						Tüm portföyleri yönet →
					</a>
				{/if}
			</div>
			
			<div>
				<h2 class="text-xl font-semibold mb-4">Finansal Hedefler</h2>
				<Card>
					<CardContent class="p-4">
						<p class="text-muted-foreground mb-4">Henüz hedefiniz yok. Finansal özgürlük yolculuğunuza başlayın.</p>
						<Button variant="default" onclick={() => goto('/goals')}>
							Hedef Oluştur
						</Button>
					</CardContent>
				</Card>
			</div>
		</div>
		
		<Card class="mt-8">
			<CardContent class="p-6">
				<h2 class="text-xl font-semibold mb-4">Hızlı İşlemler</h2>
				<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
					<Button variant="outline" onclick={() => goto('/portfolio')} class="h-auto py-4">
						<svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
						</svg>
						Yeni Portföy
					</Button>
					
					<Button variant="outline" onclick={() => goto('/budget')} class="h-auto py-4">
						<svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
						</svg>
						Bütçe Takibi
					</Button>
					
					<Button variant="outline" onclick={() => goto('/goals')} class="h-auto py-4">
						<svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
						</svg>
						Hedef Ekle
					</Button>
					
					<Button variant="outline" onclick={() => goto('/settings')} class="h-auto py-4">
						<svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
						</svg>
						Ayarlar
					</Button>
				</div>
			</CardContent>
		</Card>
	{/if}
	
	<footer class="mt-12 text-center text-sm text-muted-foreground">
		<p>Finansal Özgürlük v0.1.0 • SvelteKit + Supabase</p>
	</footer>
</div>