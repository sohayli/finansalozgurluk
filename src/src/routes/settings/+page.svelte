<script lang="ts">
	import { onMount } from 'svelte';
	
	onMount(() => {
		console.log('Settings page loaded');
	});
</script>

<div class="container mx-auto px-4 py-8">
	<h1 class="text-2xl font-bold mb-6">Ayarlar</h1>
	
	<div class="bg-white rounded-lg shadow p-6 space-y-6">
		<div>
			<h2 class="text-xl font-semibold mb-4">Profil Ayarları</h2>
			<div class="space-y-4">
				<div>
					<label class="block text-sm font-medium text-gray-700">Email</label>
					<input type="email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="email@example.com" />
				</div>
				<button class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
					Profili Güncelle
				</button>
			</div>
		</div>
		
		<div>
			<h2 class="text-xl font-semibold mb-4">Tema Ayarları</h2>
			<div class="flex items-center space-x-4">
				<label class="inline-flex items-center">
					<input type="radio" name="theme" value="light" class="text-indigo-600" checked />
					<span class="ml-2">Light</span>
				</label>
				<label class="inline-flex items-center">
					<input type="radio" name="theme" value="dark" class="text-indigo-600" />
					<span class="ml-2">Dark</span>
				</label>
			</div>
		</div>
		
		<div>
			<h2 class="text-xl font-semibold mb-4">Hesap Yönetimi</h2>
			<button class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
				Hesabı Sil
			</button>
		</div>
	</div>
</div>