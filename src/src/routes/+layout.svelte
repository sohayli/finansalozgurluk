<script lang="ts">
	import { supabase } from '$lib/supabase';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { Nav, NavLink, Head } from '$lib/components';
	import { page } from '$app/state';
	
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
		{ path: '/', label: 'Dashboard' },
		{ path: '/portfolio', label: 'Portföy' },
		{ path: '/goals', label: 'Hedefler' },
		{ path: '/budget', label: 'Bütçe' }
	];
</script>

<Head />

<div class="min-h-screen bg-background relative">
	{#if isAuthenticated}
		<Nav>
			<div class="flex items-center gap-8">
				<a href="/" class="text-xl font-bold text-gradient">
					Finansal Özgürlük
				</a>
				
				<div class="flex gap-1">
					{#each navItems as item}
						<NavLink href={item.path} active={page.url.pathname === item.path}>
							{item.label}
						</NavLink>
					{/each}
				</div>
			</div>
			
			<div class="flex items-center gap-4">
				<span class="text-sm text-muted-foreground">{user?.email}</span>
				<button
					class="btn btn-ghost btn-sm text-destructive"
					onclick={handleLogout}
				>
					Çıkış Yap
				</button>
			</div>
		</Nav>
		
		<div class="gradient-mesh"></div>
	{/if}
	
	<div class="container py-8">
		{@render children()}
	</div>
	
	<footer class="py-12 text-center">
		<p class="text-sm text-muted-foreground">
			Finansal Özgürlük v2.0 • Dark Theme
		</p>
	</footer>
</div>