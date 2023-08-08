<script>
	export let data;
	export let classes = '';
</script>

<div class="flex flex-col {classes}">
	<span class="text-sm whitespace-nowrap"
		>{data.title}</span
	>
	<span class="mt-1 whitespace-nowrap"
		>{data.data ?? '-'}</span
	>
</div>
