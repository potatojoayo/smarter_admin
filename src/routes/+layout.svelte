<script>
	import { browser } from '$app/environment';

	import mixpanel from 'mixpanel-browser';
	import { onMount } from 'svelte';
	import '../app.css';

	mixpanel.init(
		'9e4c51e4e73c2498c8e34dd278a6ec8c'
	);
	mixpanel.register({ app: 'sveltekit' });
	onMount(() => {
		if (browser) {
			window.onmessage = (e) => {
				if (e.data === 'refresh') {
					window.location.reload();
				}
			};
		}
	});
</script>

<slot />
