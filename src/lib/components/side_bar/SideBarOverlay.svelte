<script>
	import {
		isSideBarOverlayOpened,
		onClickOverlay
	} from '../../../stores/sidebar.js';
</script>

<div
	on:click|preventDefault={onClickOverlay}
	class="fixed w-screen h-screen lg:invisible
	bg-zinc-900 top-0 left-0 opacity-50 z-10
	transition-opacity duration-500
{$isSideBarOverlayOpened ? 'fixed' : 'invisible'}
"
/>
