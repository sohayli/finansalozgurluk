<script lang="ts">
	import { supabase } from '$lib/supabase';
	import { goto } from '$app/navigation';
	import { Card, CardHeader, CardTitle, CardContent, Button, Input, Label } from '$lib/components';
	
	let email = $state('');
	let password = $state('');
	let loading = $state(false);
	let error = $state('');
	
	async function handleSubmit(e: Event) {
		e.preventDefault();
		
		if (!email || !password) {
			error = 'Lütfen tüm alanları doldurun';
			return;
		}
		
		loading = true;
		error = '';
		
		try {
			const { data, error: authError } = await supabase.auth.signInWithPassword({
				email,
				password
			});
			
			if (authError) {
				error = authError.message;
			} else if (data.user) {
				await goto('/');
			}
		} catch (err) {
			error = 'Giriş sırasında bir hata oluştu';
			console.error(err);
		} finally {
			loading = false;
		}
	}
</script>

<div class="min-h-screen flex items-center justify-center px-4 hero-gradient">
	<Card class="w-full max-w-md animate-fade-up">
		<CardHeader>
			<CardTitle>Giriş Yap</CardTitle>
			<p class="card-description">
				Finansal Özgürlük hesabınızla giriş yapın
			</p>
		</CardHeader>
		<CardContent>
			<form onsubmit={handleSubmit} class="space-y-4">
				{#if error}
					<div class="alert alert-destructive">
						{error}
					</div>
				{/if}
				
				<div>
					<Label for="email">Email</Label>
					<Input 
						id="email"
						type="email" 
						placeholder="email@example.com"
						bind:value={email}
						required
					/>
				</div>
				
				<div>
					<Label for="password">Şifre</Label>
					<Input 
						id="password"
						type="password" 
						placeholder="••••••••"
						bind:value={password}
						required
					/>
				</div>
				
				<Button type="submit" class="w-full" disabled={loading}>
					{#if loading}
						<svg class="animate-spin h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24">
							<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
							<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
						</svg>
						Giriş yapılıyor...
					{:else}
						Giriş Yap
					{/if}
				</Button>
			</form>
			
			<div class="mt-4 text-center text-sm">
				<span class="text-muted-foreground">Hesabınız yok mu?</span>
				<a href="/register" class="text-primary-accent hover:underline ml-1">Kayıt Ol</a>
			</div>
		</CardContent>
	</Card>
</div>