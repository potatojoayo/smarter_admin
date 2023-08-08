<script>
	export let colspan = '1';
	export let rowspan = '1';
	export let classes = '';
</script>

<th
	class="{classes} p-3 font-normal transition-colors duration-200 whitespace-nowrap border-b-[1px] text-sm text-left"
	{colspan}
	{rowspan}
>
	<slot />
</th>
