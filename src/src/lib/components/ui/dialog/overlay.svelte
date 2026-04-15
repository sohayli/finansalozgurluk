<script lang="ts">
	import { cn } from '$lib/utils';

	let {
		class: className,
		children,
		...restProps
	}: {
		class?: string;
		children?: any;
		[key: string]: any;
	} = $props();
</script>

<div class={cn('fixed inset-0 z-50 bg-black/80', className)} {...restProps}>
	{@render children?.()}
</div>