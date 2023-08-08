<script>
	export let onClick = null;
	export let classes = '';
</script>

<button
	class="{classes} rounded text-gray-800 p-2 hover:bg-red-100 text-sm whitespace-nowrap bg-white shadow"
	on:click|stopPropagation={onClick}
>
	<slot />
</button>
