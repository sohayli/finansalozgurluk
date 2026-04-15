<script lang="ts">
	import { cn } from '$lib/utils';
	
	interface Props {
		class?: string;
		value?: string;
		type?: string;
		placeholder?: string;
		disabled?: boolean;
		[key: string]: any;
	}
	
	let { 
		class: className, 
		value = $bindable(''), 
		type = 'text',
		placeholder,
		disabled = false,
		...restProps 
	}: Props = $props();
</script>

<input 
	class={cn('input', className)} 
	{type}
	{placeholder}
	{disabled}
	bind:value
	{...restProps}
/>