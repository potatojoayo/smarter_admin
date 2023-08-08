<script>
	export let disabled = false;
	export let value = null;
	export let group = '';
	export let parent = false;
	export let classes = '';
	export let exclusive = false;
	export let onChange = (_) => {};
</script>

<input
	type="checkbox"
	class="{classes} w-6 h-6 form-checkbox rounded-md cursor-pointer border disabled:bg-gray-200 disabled:cursor-not-allowed focus:ring-transparent text-primary
	{group} {parent ? 'parent' : ''}
	focus:border-gray-200 checkbox
"
	on:click|stopPropagation={() => {}}
	on:change|stopPropagation={(e) => {
		if (parent) {
			let boxes = document.querySelectorAll(
				`.${group}`
			);
			for (let box of boxes) {
				if (!box.disabled) {
					box.checked = e.currentTarget.checked;
				}
			}
		} else {
			let parent = document.querySelectorAll(
				`.${group}.parent`
			);
			let boxes = document.querySelectorAll(
				`.${group}:not(.parent)`
			);
			let allChecked = true;
			for (let box of boxes) {
				if (!box.checked) {
					allChecked = false;
				}
			}
			if (parent.length > 0) {
				parent[0].checked = allChecked;
			}
		}

		if (exclusive) {
			let boxesOtherGroups =
				document.querySelectorAll(
					`:not(.${group}).checkbox`
				);
			for (let box of boxesOtherGroups) {
				box.checked = false;
			}
		}

		if (onChange) {
			onChange(e.currentTarget.checked);
		}
	}}
	{disabled}
	bind:value
/>
