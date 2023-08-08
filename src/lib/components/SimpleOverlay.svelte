<script>
	export let open;
</script>

<div
	on:click|preventDefault={() => (open = false)}
	class="fixed w-screen h-screen
	bg-zinc-900 top-0 left-0 opacity-50 z-30
	transition-opacity duration-500
{open ? 'fixed' : 'invisible'}
"
/>
