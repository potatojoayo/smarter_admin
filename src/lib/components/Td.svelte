<script>
	export let whitespaceNoWrap = false;
	export let rowspan = 1;
	export let colspan = 1;
	export let classes = '';
</script>

<td
	class="{classes} py-3 text-left px-2  text-sm {whitespaceNoWrap
		? 'whitespace-nowrap'
		: ''}"
	{rowspan}
	{colspan}
>
	<slot />
</td>
