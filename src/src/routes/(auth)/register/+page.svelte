<script lang="ts">
	import { supabase } from '$lib/supabase';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	
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
	
	onMount(() => {
		supabase.auth.getSession().then(({ data }) => {
			if (data.session) {
				goto('/');
			}
		});
	});
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
	<div class="max-w-md w-full space-y-8">
		<div>
			<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
				Kayıt Ol
			</h2>
			<p class="mt-2 text-center text-sm text-gray-600">
				Finansal Özgürlük hesabınızı oluşturun
			</p>
		</div>
		
		<form class="mt-8 space-y-6" onsubmit={handleSubmit}>
			{#if error}
				<div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
					<span class="block sm:inline">{error}</span>
				</div>
			{/if}
			
			<div class="rounded-md shadow-sm -space-y-px">
				<div>
					<label for="email-address" class="sr-only">Email adresi</label>
					<input
						id="email-address"
						name="email"
						type="email"
						autocomplete="email"
						required
						class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
						placeholder="Email adresi"
						bind:value={email}
					/>
				</div>
				<div>
					<label for="password" class="sr-only">Şifre</label>
					<input
						id="password"
						name="password"
						type="password"
						autocomplete="new-password"
						required
						class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
						placeholder="Şifre (en az 6 karakter)"
						bind:value={password}
					/>
				</div>
				<div>
					<label for="confirm-password" class="sr-only">Şifreyi onayla</label>
					<input
						id="confirm-password"
						name="confirm-password"
						type="password"
						autocomplete="new-password"
						required
						class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
						placeholder="Şifreyi onayla"
						bind:value={confirmPassword}
					/>
				</div>
			</div>
			
			<div>
				<button
					type="submit"
					class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					disabled={loading}
				>
					{#if loading}
						<span class="absolute left-0 inset-y-0 flex items-center pl-3">
							<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
								<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
								<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
							</svg>
						</span>
						Yükleniyor...
					{:else}
						Kayıt Ol
					{/if}
				</button>
			</div>
			
			<div class="text-center">
				<a href="/login" class="font-medium text-indigo-600 hover:text-indigo-500">
					Zaten hesabınız var mı? Giriş yapın
				</a>
			</div>
		</form>
	</div>
</div>