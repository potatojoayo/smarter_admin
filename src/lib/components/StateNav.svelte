<script>
	import StateNavItem from './StateNavItem.svelte';

	export let states;
</script>

<div class="flex w-fit space-x-2">
	{#each states as state}
		<StateNavItem {state} />
	{/each}
</div>
