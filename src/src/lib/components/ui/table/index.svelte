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

<table class={cn('w-full caption-bottom text-sm', className)} {...restProps}>
	{@render children?.()}
</table>