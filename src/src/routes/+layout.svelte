<script lang="ts">
	import { supabase } from '$lib/supabase';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	
	let { children } = $props();
	let user = $state<any>(null);
	let isAuthenticated = $state(false);
	
	onMount(async () => {
		const { data: { session } } = await supabase.auth.getSession();
		user = session?.user;
		isAuthenticated = !!session;
		
		supabase.auth.onAuthStateChange((event, session) => {
			user = session?.user;
			isAuthenticated = !!session;
			if (event === 'SIGNED_OUT') {
				goto('/login');
			}
		});
	});
	
	async function handleLogout() {
		await supabase.auth.signOut();
		goto('/login');
	}
	
	const navItems = [
		{ path: '/', label: 'Dashboard', icon: 'dashboard' },
		{ path: '/portfolio', label: 'Portföy', icon: 'portfolio' },
		{ path: '/goals', label: 'Hedefler', icon: 'goals' },
		{ path: '/budget', label: 'Bütçe', icon: 'budget' },
		{ path: '/settings', label: 'Ayarlar', icon: 'settings' }
	];
</script>

<svelte:head>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<link rel="manifest" href="/manifest.json" />
	<title>Finansal Özgürlük</title>
</svelte:head>

<div class="min-h-screen bg-gray-50">
	{#if isAuthenticated}
		<!-- Navigation Header -->
		<nav class="bg-white shadow-sm">
			<div class="container mx-auto px-4">
				<div class="flex justify-between h-16">
					<div class="flex items-center">
						<a href="/" class="text-xl font-bold text-indigo-600">Finansal Özgürlük</a>
					</div>
					
					<div class="flex items-center gap-4">
						<div class="flex gap-2">
							{#each navItems as item}
								<a href={item.path} class="px-3 py-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">
									{item.label}
								</a>
							{/each}
						</div>
						
						<div class="border-l pl-4 flex items-center gap-3">
							<span class="text-sm text-gray-600">{user?.email}</span>
							<button
								class="text-sm text-gray-600 hover:text-red-600 transition-colors"
								onclick={handleLogout}
							>
								Çıkış Yap
							</button>
						</div>
					</div>
				</div>
			</div>
		</nav>
	{/if}
	
	{@render children()}
</div>