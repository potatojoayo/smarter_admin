<script>
	export let value;
	export let onInput = () => {};
	export let classes = '';
	export let placeholder = '';
	export let disabled = false;
</script>

<input
	type="number"
	class="{classes} border rounded p-2 focus:border-primary"
	{placeholder}
	{disabled}
	bind:value
	on:input={onInput}
/>
