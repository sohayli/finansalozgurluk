<script lang="ts">
	import { onMount } from 'svelte';
	
	onMount(() => {
		console.log('Goals page loaded');
	});
</script>

<div class="container mx-auto px-4 py-8">
	<h1 class="text-2xl font-bold mb-6">Finansal Hedeflerim</h1>
	
	<div class="bg-white rounded-lg shadow p-6">
		<div class="flex justify-between items-center mb-4">
			<h2 class="text-xl font-semibold">Hedef Listesi</h2>
			<button class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
				Yeni Hedef
			</button>
		</div>
		
		<div class="text-gray-500 text-center py-8">
			Henüz finansal hedefiniz yok. Yeni bir hedef oluşturun.
		</div>
	</div>
</div>