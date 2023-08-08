<script>
	import { Shadow } from 'svelte-loading-spinners';
	import { isLoading } from '../../stores/global_setting.js';
</script>

{#if $isLoading}
	<div class="fixed top-[50%] left-[50%]">
		<Shadow color="#3d5a80" duration="1.3s" />
	</div>
{:else}
	<slot />
{/if}
