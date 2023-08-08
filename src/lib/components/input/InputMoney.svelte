<script lang="ts">
	import formatMoney from '$lib/utils/formatMoney';
	import extractNumber from '$lib/utils/extractNumber';

	export let value;
	export let classes = '';
	export let disabled = false;
	export let onInput = null;
</script>

<input
	class="{classes} placeholder:text-gray-400 p-2 border rounded h-10 text-sm"
	{disabled}
	type="text"
	value={formatMoney({
		money: value,
		suffix: false
	})}
	on:input={(e) => {
		e.preventDefault();
		const regExp = /[^0-9]/g;
		if (regExp.test(e.currentTarget.value)) {
			e.currentTarget.value =
				e.currentTarget.value.replace(regExp, '');
		}
		value = extractNumber(e.currentTarget.value);
		if (onInput) onInput(value);
	}}
/>
