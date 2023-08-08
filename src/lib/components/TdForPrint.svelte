<script>
	export let whitespaceNoWrap = false;
	export let rowspan = 1;
	export let colspan = 1;
	export let classes = '';
</script>

<td
	class="{classes} text-center border border-black p-1 {whitespaceNoWrap
		? 'whitespace-nowrap'
		: ''}"
	{rowspan}
	{colspan}
>
	<slot />
</td>
