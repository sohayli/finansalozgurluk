<script lang="ts">
	// Auth layout - minimal layout for login/register pages
	let { children } = $props();
</script>

<!-- Auth layout - no navbar, just the children -->
{@render children()}