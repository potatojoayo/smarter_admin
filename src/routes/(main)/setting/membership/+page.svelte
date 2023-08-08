<script>
	import Button from '$lib/components/Button.svelte';
	import formatMoney from '../../../../utils/format_money';
	import { updateMembership } from '../../../../stores/setting.js';
	import extractNumberString from '$lib/utils/extractNumberString';

	export let data;

	let memberships = data.memberships;

	let selectedMembership = memberships[0];
</script>

<main class="flex flex-col items-center">
	<section
		class="flex flex-row mt-3 min-h-[300px] bg-white"
	>
		<div
			class="flex flex-col border rounded-tl-lg rounded-bl-lg py-5 min-w-[300px]  items-center"
		>
			{#each memberships as membership}
				<div
					class="py-1 flex justify-center items-center text-md w-full  px-16 group relative cursor-pointer border-primary {selectedMembership.id ===
					membership.id
						? 'bg-primary text-white'
						: 'hover:bg-gray-300'}
"
					on:click={(_) => {
						selectedMembership = membership;
					}}
				>
					<span class="pointer-events-none">
						{membership.name}
					</span>
				</div>
			{/each}
		</div>
		<div
			class="flex flex-col py-5 px-10 border-t border-r border-b rounded-tr-lg rounded-br-lg justify-between "
			style="max-width: 500px;"
		>
			<div class="flex flex-col">
				<div class="flex flex-col">
					<div class="mb-1 text-sm">등급이름</div>
					<span class="text-lg"
						>{selectedMembership.name}</span
					>
				</div>
				<div class="border-b w-full my-5" />
				<div class="flex flex-col">
					<div class="flex items-center">
						<span>구매금액</span>
						<input
							type="text"
							class="border p-1 rounded mx-2 text-right"
							value={formatMoney(
								selectedMembership.condition
							)}
							on:input={(e) => {
								selectedMembership.condition =
									extractNumberString(
										e.target.value
									);
							}}
						/>
						<span>원 이상</span>
					</div>
				</div>
				<div class="border-b w-full my-5" />
				<div class="flex flex-col">
					<div class="flex items-center">
						<input
							type="text"
							class="border p-1 rounded mr-2 text-right w-28"
							value={formatMoney(
								selectedMembership.threshold
							)}
							on:input={(e) => {
								selectedMembership.threshold =
									extractNumberString(
										e.target.value
									);
							}}
						/>
						<span>원 이상 구매 시 </span>
						<input
							type="text"
							class="border p-1 rounded mx-2 text-right w-20"
							value={formatMoney(
								selectedMembership.percentage
							)}
							on:input={(e) => {
								selectedMembership.percentage =
									extractNumberString(
										e.target.value
									);
							}}
						/>
						<span>% 적립</span>
					</div>
					<div class="flex items-center" />
					<div class="border-b w-full my-5" />
					<div class="flex items-center">
						<span>최대</span>
						<input
							type="text"
							class="border p-1 rounded mx-2 text-right w-28"
							value={formatMoney(
								selectedMembership.max
							)}
							on:input={(e) => {
								selectedMembership.max =
									extractNumberString(
										e.target.value
									);
							}}
						/>
						<span>원 적립</span>
					</div>
				</div>
				<Button
					classes="flex-1 mr-2 w-20 ml-auto mt-10"
					onClick={async () => {
						if (confirm('저장하시겠습니까?')) {
							if (
								await updateMembership(
									selectedMembership
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
		</div>
	</section>
	<div class="border mt-10 p-5 rounded bg-white">
		<div class="">
			누적 구매금액 기준 자동 등급 변경(매일 새벽
			4시 갱신)
		</div>
		<div
			class="text-sm text-gray-500 mt-3"
			style="max-width: 500px"
		>
			등급 조건이 수정하더라도 기존 회원들의
			등급이 자동으로 변하지 않습니다. <br /><br
			/>예: 회원A의 구매금액이 5,000원이고 B라는
			등급일 때 B의 조건을 10,000원으로
			수정하더라도 회원A의 등급이 변경되지
			않습니다. 이때 회원A의 등급은 추가 구매후
			자동 등급 갱신 주기에 따라 조정됩니다.
		</div>
	</div>
</main>
