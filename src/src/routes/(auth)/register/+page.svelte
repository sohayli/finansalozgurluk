<script lang="ts">
	import { supabase } from '$lib/supabase';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/button/index.svelte';
	import Input from '$lib/components/ui/input/index.svelte';
	import Label from '$lib/components/ui/label/index.svelte';
	import Card from '$lib/components/ui/card/index.svelte';
	import CardHeader from '$lib/components/ui/card/header.svelte';
	import CardTitle from '$lib/components/ui/card/title.svelte';
	import CardContent from '$lib/components/ui/card/content.svelte';
	
	let email = $state('');
	let password = $state('');
	let confirmPassword = $state('');
	let loading = $state(false);
	let error = $state('');
	
	async function handleSubmit(e: Event) {
		e.preventDefault();
		
		if (!email || !password || !confirmPassword) {
			error = 'Lütfen tüm alanları doldurun';
			return;
		}
		
		if (password !== confirmPassword) {
			error = 'Şifreler eşleşmiyor';
			return;
		}
		
		if (password.length < 6) {
			error = 'Şifre en az 6 karakter olmalıdır';
			return;
		}
		
		loading = true;
		error = '';
		
		try {
			const { data, error: authError } = await supabase.auth.signUp({
				email,
				password
			});
			
			if (authError) {
				error = authError.message;
			} else if (data.user) {
				await goto('/login');
			}
		} catch (err) {
			error = 'Kayıt sırasında bir hata oluştu';
			console.error(err);
		} finally {
			loading = false;
		}
	}
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
	<Card class="w-full max-w-md">
		<CardHeader>
			<CardTitle>Kayıt Ol</CardTitle>
			<p class="text-sm text-muted-foreground mt-2">
				Finansal Özgürlük hesabınızı oluşturun
			</p>
		</CardHeader>
		<CardContent>
			<form onsubmit={handleSubmit} class="space-y-4">
				{#if error}
					<div class="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-md text-sm">
						{error}
					</div>
				{/if}
				
				<div class="space-y-2">
					<Label for="email">Email</Label>
					<Input 
						id="email"
						type="email" 
						placeholder="email@example.com"
						bind:value={email}
						required
					/>
				</div>
				
				<div class="space-y-2">
					<Label for="password">Şifre</Label>
					<Input 
						id="password"
						type="password" 
						placeholder="••••••••"
						bind:value={password}
						required
					/>
					<p class="text-xs text-muted-foreground">En az 6 karakter</p>
				</div>
				
				<div class="space-y-2">
					<Label for="confirm">Şifreyi Onayla</Label>
					<Input 
						id="confirm"
						type="password" 
						placeholder="••••••••"
						bind:value={confirmPassword}
						required
					/>
				</div>
				
				<Button type="submit" class="w-full" disabled={loading}>
					{#if loading}
						<svg class="animate-spin h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24">
							<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
							<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
						</svg>
						Kayıt yapılıyor...
					{:else}
						Kayıt Ol
					{/if}
				</Button>
			</form>
			
			<div class="mt-4 text-center text-sm">
				<span class="text-muted-foreground">Zaten hesabınız var mı?</span>
				<a href="/login" class="text-primary hover:underline ml-1">Giriş Yap</a>
			</div>
		</CardContent>
	</Card>
</div>