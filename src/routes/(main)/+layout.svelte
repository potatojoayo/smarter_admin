<script lang="ts">
	import SideBar from '../../lib/components/side_bar/SideBar.svelte';
	import Overlay from '../../lib/components/Overlay.svelte';
	import AppBar from '../../lib/components/app_bar/AppBar.svelte';
	import SideBarOverlay from '../../lib/components/side_bar/SideBarOverlay.svelte';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import mixpanel from 'mixpanel-browser';

	export let data: PageData;

	let user = data.me;

	onMount(() => {
		mixpanel.identify(user.id);
		mixpanel.people.set('name', user.name);
	});
</script>

<SideBarOverlay />
<Overlay />
<AppBar {user} />
<main class="container mx-auto">
	<SideBar {user} />
	<div class="pb-8 pt-24">
		<slot />
	</div>
</main>
