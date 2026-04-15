<script lang="ts">
	import { cn } from '$lib/utils';
	
	interface Props {
		class?: string;
		value?: number;
		max?: number;
	}
	
	let { class: className, value = 0, max = 100 }: Props = $props();
	
	const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
</script>

<div class={cn('progress', className)}>
	<div 
		class="progress-bar" 
		style="width: {percentage}%"
	></div>
</div>