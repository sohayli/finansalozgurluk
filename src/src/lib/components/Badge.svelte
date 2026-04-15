<script lang="ts">
	import { cn } from '$lib/utils';
	
	type Variant = 'default' | 'secondary' | 'success' | 'destructive' | 'outline';
	
	interface Props {
		variant?: Variant;
		class?: string;
		children?: any;
	}
	
	let { variant = 'default', class: className, children }: Props = $props();
	
	const variantClasses: Record<Variant, string> = {
		default: 'badge-default',
		secondary: 'badge-secondary',
		success: 'badge-success',
		destructive: 'badge-destructive',
		outline: 'badge-outline'
	};
</script>

<div class={cn('badge', variantClasses[variant], className)}>
	{@render children?.()}
</div>