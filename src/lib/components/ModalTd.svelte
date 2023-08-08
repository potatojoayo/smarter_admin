<script>
	export let whitespaceNoWrap = false;
	export let rowspan = 1;
	export let colspan = 1;
	export let classes = '';
</script>

<td
	class="{classes} w-3/4 pt-2 pl-7 pb-1.5 pr-3 border text-sm {whitespaceNoWrap
		? 'whitespace-nowrap'
		: ''}"
	{rowspan}
	{colspan}
>
	<slot />
</td>
