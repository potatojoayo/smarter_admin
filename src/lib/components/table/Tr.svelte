<script lang="ts">
	export let onClick: null | (() => void) = null;
	export let classes = '';
</script>

<tr
	class="hover:bg-gray-100 border-b {onClick ? 'cursor-pointer' : ''} {classes}"
	on:click={onClick}
>
	<slot />
</tr>
