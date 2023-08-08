<script>
	import {
		isOverlayOpened,
		onClickOverlay
	} from '../../stores/global_setting.js';

	export let open = false,
		onClick = null;
</script>

<button
	on:click|preventDefault={onClick ??
		onClickOverlay}
	class="fixed w-screen h-screen
	bg-zinc-900 top-0 left-0 opacity-50 z-30
	transition-opacity duration-500
{$isOverlayOpened | open ? 'fixed' : 'invisible'}
"
/>
