<script>
	export let open;
	export let classes = '';
</script>

<dialog
	class="{classes} p-8 fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] rounded flex flex-col z-40 max-h-screen overflow-y-scroll bg-white {open
		? 'visible'
		: 'invisible'}"
>
	<slot />
</dialog>
