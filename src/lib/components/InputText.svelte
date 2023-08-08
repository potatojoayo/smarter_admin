<script>
	export let value = '';
	export let onInput = () => {};
	export let onKeyUp = () => {};
	export let onSubmit = () => {};
	export let classes = '';
	export let placeholder = '';
	export let disabled = false;
	export let maxlength = '';
</script>

<input
	type="text"
	class="{classes} rounded p-2 focus:border-primary border-none shadow"
	{placeholder}
	{disabled}
	{maxlength}
	bind:value
	on:submit={onSubmit}
	on:input={onInput}
	on:keyup={onKeyUp}
/>
