<script>
	export let onClick = null;
	export let classes = '';
	export let disabled = false;
</script>

<button
	class="{classes} {disabled
		? 'bg-gray-300 cursor-not-allowed'
		: ' hover:bg-gray-100'} rounded p-2 text-gray-800 text-sm bg-white shadow"
	on:click|stopPropagation={onClick}
	{disabled}
>
	<slot />
</button>
