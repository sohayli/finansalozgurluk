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

<div class={cn('rounded-lg border bg-destructive/10 text-destructive px-4 py-3', className)} {...restProps}>
	{@render children?.()}
</div>