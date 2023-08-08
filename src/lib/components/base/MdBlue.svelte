<script>
	export let bold = false;
	export let text = '';
	export let classes = '';
</script>

<span
	class="{classes}{bold
		? 'font-bold'
		: ''} text-blue-500 text-sm"
>
	{text}
	<slot />
</span>
