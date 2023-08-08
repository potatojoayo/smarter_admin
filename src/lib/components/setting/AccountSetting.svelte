<script>
	import Th from '../Th.svelte';
	import Tr from '../Tr.svelte';
	import Td from '../Td.svelte';
	import ErrorButton from '../ErrorButton.svelte';
	import Button from '../Button.svelte';
	import { createOrUpdateBankAccount } from '../../../stores/setting.js';

	export let accounts;

	let deletedAccountIds = [];
	let defaultAccountIndex = accounts.findIndex(
		(a) => a.isDefault
	);
</script>

<section
	class="flex flex-col items-start border rounded p-5 bg-white"
>
	<div class="text-xl">계좌설정</div>

	<div
		class="border rounded overflow-hidden mt-3"
	>
		<table class="min-w-[800px]">
			<thead>
				<tr>
					<Th>입금은행명</Th>
					<Th>계좌번호</Th>
					<Th>예금주명</Th>
					<Th>기본계좌</Th>
					<Th>사용유무</Th>
					<Th>삭제</Th>
				</tr>
			</thead>
			<tbody>
				{#each accounts as account, index}
					<Tr>
						<Td>
							<input
								type="text"
								class="rounded w-28 text-center"
								bind:value={account.bankName}
							/>
						</Td>
						<Td>
							<input
								type="text"
								class="rounded text-center"
								bind:value={account.accountNo}
							/>
						</Td>
						<Td>
							<input
								type="text"
								class="rounded text-center"
								bind:value={account.ownerName}
							/>
						</Td>
						<Td classes="border-l">
							<input
								type="radio"
								name="account"
								bind:group={defaultAccountIndex}
								value={index}
								on:change={() => {
									defaultAccountIndex = index;
									for (
										let i = 0;
										i < accounts.length;
										i++
									) {
										accounts[i].isDefault =
											i === index;
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
										bind:group={account.isActive}
										value={true}
									/>
									사용
								</label>
								<label class="ml-3">
									<input
										type="radio"
										bind:group={account.isActive}
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
									if (account.id) {
										deletedAccountIds.push(
											account.id
										);
									}
									if (
										index === defaultAccountIndex
									) {
										if (accounts.length === 1) {
											defaultAccountIndex = null;
										} else {
											defaultAccountIndex = 0;
											accounts[0].isDefault = true;
										}
									}
									accounts.splice(index, 1);
									accounts = accounts;
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
				accounts.push({
					bankName: null,
					accountNo: null,
					ownerName: null,
					isDefault: false,
					isActive: true
				});
				accounts = accounts;
			}}>추가</Button
		>
		<div class="mx-1" />
		<Button
			classes="w-20 p-3"
			onClick={async () => {
				for (let account of accounts) {
					if (
						!account.bankName ||
						!account.accountNo ||
						!account.ownerName
					) {
						return alert(
							'계좌 정보를 모두 입력해주세요.'
						);
					}
					if (
						account.isDefault &&
						!account.isActive
					) {
						return alert(
							'기본계좌는 미사용으로 설정할 수 없습니다.'
						);
					}
				}
				if (confirm('저장하시겠습니까?')) {
					if (
						await createOrUpdateBankAccount(
							accounts,
							deletedAccountIds
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
