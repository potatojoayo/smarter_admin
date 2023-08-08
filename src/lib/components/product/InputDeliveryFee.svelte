<script>
	import formatMoney from '../../utils/formatMoney';
	import InputText from '../InputText.svelte';
	export let productMaster;
	let money = formatMoney(
		productMaster.priceDelivery
	);
</script>

<div class="flex flex-col">
	<div class="flex">
		<span class="text-lg mr-1">배송비</span>
		<span class="text-red-500">*</span>
	</div>
	<div class="flex items-center mt-2 ">
		<InputText
			classes="border rounded p-2 mr-1 text-right w-28"
			placeholder="0"
			bind:value={money}
			onInput={(e) => {
				productMaster.priceDelivery =
					e.target.value.replace(/\D/g, '');
				money = formatMoney({
					money: productMaster.priceDelivery
				});
			}}
		/>
		<span> 원 </span>
	</div>
</div>
