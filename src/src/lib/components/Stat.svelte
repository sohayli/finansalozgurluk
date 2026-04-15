<script lang="ts">
	import { cn } from '$lib/utils';
	
	interface Props {
		label: string;
		value: string | number;
		change?: string | number;
		changeType?: 'positive' | 'negative' | 'neutral';
		class?: string;
	}
	
	let { label, value, change, changeType = 'neutral', class: className }: Props = $props();
	
	const changeClasses = {
		positive: 'stat-change-positive',
		negative: 'stat-change-negative',
		neutral: ''
	};
</script>

<div class={cn('stat', className)}>
	<span class="stat-label">{label}</span>
	<span class="stat-value">{value}</span>
	{#if change}
		<span class={cn('stat-change', changeClasses[changeType])}>{change}</span>
	{/if}
</div>