<script lang="ts">
	import { cn } from '$lib/utils';
	
	interface Props {
		class?: string;
		children?: any;
	}
	
	let { class: className, children }: Props = $props();
</script>

<nav class={cn('nav', className)}>
	<div class="container flex h-16 items-center justify-between">
		{@render children?.()}
	</div>
</nav>