<script>
	export let whitespaceNoWrap = false;
	export let rowspan = 1;
	export let colspan = 1;
	export let classes = '';
</script>

<td
	class="{classes} w-1/4 pt-2 pr-0 pb-1.5 pl-3 border text-sm {whitespaceNoWrap
		? 'whitespace-nowrap'
		: ''}"
	{rowspan}
	{colspan}
>
	<slot />
</td>


