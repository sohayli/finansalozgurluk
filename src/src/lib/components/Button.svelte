<script lang="ts">
	import { cn } from '$lib/utils';
	
	type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'success';
	type Size = 'default' | 'sm' | 'lg' | 'icon';
	
	interface Props {
		variant?: Variant;
		size?: Size;
		class?: string;
		children?: any;
		disabled?: boolean;
		[key: string]: any;
	}
	
	let { 
		variant = 'primary', 
		size = 'default', 
		class: className, 
		children, 
		disabled = false,
		...restProps 
	}: Props = $props();
	
	const variantClasses: Record<Variant, string> = {
		primary: 'btn-primary',
		secondary: 'btn-secondary',
		outline: 'btn-outline',
		ghost: 'btn-ghost',
		destructive: 'btn-destructive',
		success: 'btn-success'
	};
	
	const sizeClasses: Record<Size, string> = {
		default: '',
		sm: 'btn-sm',
		lg: 'btn-lg',
		icon: 'btn-icon'
	};
</script>

<button 
	class={cn('btn', variantClasses[variant], sizeClasses[size], className)} 
	disabled={disabled}
	{...restProps}
>
	{@render children?.()}
</button>