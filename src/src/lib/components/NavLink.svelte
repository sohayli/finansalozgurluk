<script lang="ts">
	import { cn } from '$lib/utils';
	
	interface Props {
		href: string;
		active?: boolean;
		class?: string;
		children?: any;
	}
	
	let { href, active = false, class: className, children }: Props = $props();
</script>

<a 
	href={href} 
	class={cn('nav-link', active && 'nav-link-active', className)}
>
	{@render children?.()}
</a>