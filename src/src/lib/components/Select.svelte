<script lang="ts">
	import { cn } from '$lib/utils';
	
	interface Props {
		class?: string;
		value?: string;
		disabled?: boolean;
		children?: any;
		[key: string]: any;
	}
	
	let { 
		class: className, 
		value = $bindable(''), 
		disabled = false,
		children,
		...restProps 
	}: Props = $props();
</script>

<select 
	class={cn('select', className)} 
	bind:value
	{disabled}
	{...restProps}
>
	{@render children?.()}
</select>