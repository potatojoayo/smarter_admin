<script>
	import formatMoney from '../../../utils/formatMoney';
	import Button from '../../Button.svelte';
	import ErrorButton from '../../ErrorButton.svelte';
	import {
		completeClaims,
		declineClaims
	} from '../../../../stores/order';
	import extractNumberString from '$lib/utils/extractNumberString';

	export let claim;
	export let returnDialogOpen;
	let refund;
</script>

<dialog
	class="p-8 fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] rounded flex  z-40 flex-col items-center"
>
	<div>환불 금액을 입력해주세요.</div>

	<div class="flex items-center text-lg mt-10 ">
		<input
			type="text"
			value={formatMoney({ money: refund })}
			class="max-w-[100px] rounded mr-2 text-right"
			on:input={(e) => {
				refund = extractNumberString(
					e.target.value
				);
			}}
		/>
		<div class="">원</div>
	</div>
	<div class="flex justify-end w-80 mt-10">
		<ErrorButton
			classes="p-3"
			onClick={async () => {
				if (confirm('반품을 반려하시겠습니까?')) {
					if (
						await declineClaims([claim.claimId])
					) {
						alert('반품이 반려되었습니다.');
						return location.reload();
					}
					alert('실패');
				}
			}}>반품반려</ErrorButton
		>
		<div class="mx-1" />
		<Button
			classes="p-3"
			onClick={async () => {
				if (!refund) {
					return alert(
						'환불금액을 입력해주세요.'
					);
				}
				if (confirm('반품을 완료하시겠습니까?')) {
					if (
						await completeClaims(
							[claim.claimId],
							refund
						)
					) {
						alert('반품이 완료되었습니다.');
						return location.reload();
					}
					alert('실패');
				}
			}}>반품완료</Button
		>
	</div>
</dialog>
