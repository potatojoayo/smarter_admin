<script>
	import AccountSetting from '$lib/components/setting/AccountSetting.svelte';
	import DeliverySetting from '$lib/components/setting/DeliverySetting.svelte';
	import formatMoney from '../../../../utils/format_money';
	import Button from '$lib/components/Button.svelte';
	import { updateExtraPriceDelivery } from '../../../../stores/setting.js';
	import extractNumberString from '$lib/utils/extractNumberString';

	export let data;
	let extraPriceDelivery =
		data.extraPriceDelivery.price;
</script>

<main class="flex flex-col items-center">
	<AccountSetting accounts={data.accounts} />
	<div class="my-5" />
	<DeliverySetting
		deliveryAgencies={data.deliveryAgencies}
	/>
	<div class="my-5" />

	<section
		class="flex flex-col items-start border rounded p-10 w-[500px] bg-white"
	>
		<div class="text-lg">
			도서산간 추가배송료 설정
		</div>
		<div
			class="flex justify-center items-center mt-10 w-full"
		>
			<input
				type="text"
				value={formatMoney(extraPriceDelivery)}
				class="text-right w-20 rounded"
				on:input={(e) => {
					extraPriceDelivery =
						extractNumberString(e.target.value);
				}}
			/>
			<span class="text-lg ml-1"> 원 </span>
		</div>
		<div class="flex justify-end w-full mt-10">
			<Button
				classes="p-3 w-20"
				onClick={async () => {
					if (!extraPriceDelivery) {
						return alert(
							'추가배송료를 입력해주세요.'
						);
					}
					if (
						confirm(
							'도서산간 추가배송료를 저장하시겠습니까?'
						)
					) {
						if (
							await updateExtraPriceDelivery(
								extraPriceDelivery
							)
						) {
							alert('저장되었습니다.');
							return location.reload();
						}
						alert('실패');
					}
				}}>저장</Button
			>
		</div>
	</section>
</main>

<div class="my-20" />
