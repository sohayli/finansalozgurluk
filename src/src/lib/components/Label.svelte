<script lang="ts">
	import { cn } from '$lib/utils';
	
	interface Props {
		class?: string;
		children?: any;
		for?: string;
	}
	
	let { class: className, children, for: labelFor }: Props = $props();
</script>

<label class={cn('label', className)} for={labelFor}>
	{@render children?.()}
</label>