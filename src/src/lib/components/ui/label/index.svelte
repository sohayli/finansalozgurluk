<script lang="ts">
	import { cn } from '$lib/utils';

	let {
		class: className,
		children,
		for: labelFor,
		...restProps
	}: {
		class?: string;
		children?: any;
		for?: string;
		[key: string]: any;
	} = $props();
</script>

<label class={cn('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70', className)} for={labelFor} {...restProps}>
	{@render children?.()}
</label>