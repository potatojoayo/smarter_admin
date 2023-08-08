<script>
	export let onClick = null;
	export let error = false;
	export let classes = '';
</script>

<tr
	class="group {classes} hover:bg-gray-100 border-b cursur {onClick
		? 'cursor-pointer'
		: ''}"
	on:click={onClick}
>
	<slot />
</tr>
