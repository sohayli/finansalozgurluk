<script lang="ts">
	import { onMount } from 'svelte';
	
	onMount(() => {
		console.log('Budget page loaded');
	});
</script>

<div class="container mx-auto px-4 py-8">
	<h1 class="text-2xl font-bold mb-6">Bütçe Yönetimi</h1>
	
	<div class="bg-white rounded-lg shadow p-6">
		<div class="flex justify-between items-center mb-4">
			<h2 class="text-xl font-semibold">Gelir/Gider Takibi</h2>
			<button class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
				Yeni İşlem
			</button>
		</div>
		
		<div class="text-gray-500 text-center py-8">
			Henüz gelir/gider kaydınız yok. İlk işleminizi ekleyin.
		</div>
	</div>
</div>