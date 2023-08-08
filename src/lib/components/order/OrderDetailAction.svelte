<script>
	import Button from '../Button.svelte';

	export let states;

	let buttons = [];

	let checkedProductState;

	$: {
		let same = states.every(
			(v) =>
				v.name === states[0].name &&
				v.workState === states[0].workState
		);
		let temp = true;
		for (let i = 0; i < states.length; i++) {
			let state = states[i];
			if (
				state.name !== '결제완료' &&
				state.name !== '작업완료'
			) {
				temp = false;
				break;
			}
		}
		if (temp) {
			same = true;
		}
		if (same) {
			checkedProductState = states[0];
		} else {
			checkedProductState = null;
		}
	}

	$: {
		buttons = [];
		if (checkedProductState) {
			if (
				checkedProductState.name === '무통장입금'
			) {
				buttons.push({
					title: '결제완료',
					action: () => {}
				});
			} else if (
				checkedProductState.name === '결제완료'
			) {
				buttons.push(
					{
						title: '작업실전송',
						action: () => {}
					},
					{
						title: '출고준비',
						action: () => {}
					}
				);
			} else if (
				checkedProductState.name === '작업중'
			) {
				let title = '작업완료';
				let action = () => {};
				buttons.push({ title, action });
			} else if (
				checkedProductState.name === '작업완료'
			) {
				buttons.push(
					{
						title: '작업실전송',
						action: () => {}
					},
					{
						title: '출고준비',
						action: () => {}
					}
				);
			} else if (
				checkedProductState.name === '출고준비'
			) {
				let title = '배송시작';
				let action = () => {};
				buttons.push({ title, action });
			} else if (
				checkedProductState.name === '배송중'
			) {
				let title = '배송완료';
				let action = () => {};
				buttons.push({ title, action });
			}
		}
	}
</script>

{#if checkedProductState}
	{#each buttons as button}
		<Button classes="ml-2">
			{button.title}
		</Button>
	{/each}
{/if}
