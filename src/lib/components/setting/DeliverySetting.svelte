<script>
	import Th from '../Th.svelte';
	import Tr from '../Tr.svelte';
	import Td from '../Td.svelte';
	import ErrorButton from '../ErrorButton.svelte';
	import Button from '../Button.svelte';
	import {
		createOrUpdateBankAccount,
		createOrUpdateDeliveryAgency
	} from '../../../stores/setting.js';

	export let deliveryAgencies;

	let deletedAgencyIds = [];
	let defaultAgencyIndex =
		deliveryAgencies.findIndex(
			(a) => a.isDefault
		);
</script>

<section
	class="flex flex-col items-start border rounded p-5 bg-white"
>
	<div class="text-xl">배송설정</div>

	<div
		class="border rounded overflow-hidden mt-3"
	>
		<table class="min-w-[800px]">
			<thead>
				<tr>
					<Th>배송사</Th>
					<Th>기본배송</Th>
					<Th>사용유무</Th>
					<Th>삭제</Th>
				</tr>
			</thead>
			<tbody>
				{#each deliveryAgencies as agency, index}
					<Tr>
						<Td>
							<input
								type="text"
								class="rounded w-28 text-center"
								bind:value={agency.name}
							/>
						</Td>
						<Td classes="border-l">
							<input
								type="radio"
								name="agency"
								bind:group={defaultAgencyIndex}
								value={index}
								on:change={() => {
									defaultAgencyIndex = index;
									for (
										let i = 0;
										i < deliveryAgencies.length;
										i++
									) {
										deliveryAgencies[
											i
										].isDefault = i === index;
									}
								}}
							/>
						</Td>
						<Td
							whitespaceNoWrap
							classes="border-l border-r w-44"
						>
							<span>
								<label>
									<input
										type="radio"
										bind:group={agency.isActive}
										value={true}
									/>
									사용
								</label>
								<label class="ml-3">
									<input
										type="radio"
										bind:group={agency.isActive}
										value={false}
									/>
									미사용
								</label>
							</span>
						</Td>
						<Td>
							<ErrorButton
								classes="p-2 w-16 bg-error border-error text-red-900"
								onClick={() => {
									if (agency.id) {
										deletedAgencyIds.push(
											agency.id
										);
									}
									if (
										index === defaultAgencyIndex
									) {
										if (
											deliveryAgencies.length ===
											1
										) {
											defaultAgencyIndex = null;
										} else {
											defaultAgencyIndex = 0;
											deliveryAgencies[0].isDefault = true;
										}
									}
									deliveryAgencies.splice(
										index,
										1
									);
									deliveryAgencies =
										deliveryAgencies;
								}}>삭제</ErrorButton
							>
						</Td>
					</Tr>
				{/each}
			</tbody>
		</table>
	</div>
	<div class="flex justify-end w-full mt-3">
		<Button
			classes="w-20 p-3"
			onClick={() => {
				deliveryAgencies.push({
					name: null,
					isDefault: false,
					isActive: true
				});
				deliveryAgencies = deliveryAgencies;
			}}>추가</Button
		>
		<div class="mx-1" />
		<Button
			classes="w-20 p-3"
			onClick={async () => {
				for (let agency of deliveryAgencies) {
					if (!agency.name) {
						return alert(
							'배송사 이름을 입력해주세요'
						);
					}
					if (
						agency.isDefault &&
						!agency.isActive
					) {
						return alert(
							'기본배송사는 미사용으로 설정할 수 없습니다.'
						);
					}
				}
				if (confirm('저장하시겠습니까?')) {
					if (
						await createOrUpdateDeliveryAgency(
							deliveryAgencies,
							deletedAgencyIds
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
