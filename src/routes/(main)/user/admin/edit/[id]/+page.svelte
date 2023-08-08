<script>
	import Button from '../../../../../../lib/components/Button.svelte';
	import formatPhone from '../../../../../../utils/format_phone';
	import { createOrUpdateAdmin } from '../../../../../../stores/user.js';
	import extractNumberString from '$lib/utils/extractNumberString';
	export let data;
	let admin = data.admin;
	let checkPassword;

	async function save() {
		if (
			!admin.identification ||
			!admin.name ||
			!admin.phone
		) {
			return alert(
				'필수항목을 모두 입력해주세요.'
			);
		}
		if (admin.password) {
			if (admin.password !== checkPassword) {
				return alert(
					'비밀번호가 일치하지 않습니다.'
				);
			}
		}
		if (confirm('저장하시겠습니까?')) {
			let input = { ...admin };
			input.id = input.userId;
			delete input.userId;
			let group = input.group;
			delete input.group;
			const result = await createOrUpdateAdmin(
				input,
				group
			);
			if (result.success) {
				alert('저장되었습니다.');
				return history.back();
			}
			if (result.duplicated) {
				return alert(
					'중복된 아이디입니다. 다른 아이디를 입력해주세요.'
				);
			}
			alert('실패');
		}
	}
</script>

<section class="flex justify-center mb-10">
	<div
		class="flex flex-col  rounded p-10 min-w-[500px] shadow-xl"
	>
		<div class="flex flex-col">
			<div class="flex">
				<span>아이디</span>
				{#if !admin.userId}
					<span class="text-red-500 ml-1">*</span>
				{/if}
			</div>
			{#if !admin.userId}
				<input
					type="text"
					bind:value={admin.identification}
					class="border rounded p-2 mt-3"
				/>
			{:else}
				<div class="text-lg mt-2">
					{admin.identification}
				</div>
			{/if}
		</div>
		<div class="flex flex-col mt-5">
			<div class="flex">
				<span>직책</span>
				<span class="text-red-500 ml-1">*</span>
			</div>
			<input
				type="text"
				class="border rounded p-2 mt-3"
				bind:value={admin.group}
			/>
		</div>
		<div class="flex flex-col mt-5">
			<div class="flex">
				<span>관리자이름</span>
				<span class="text-red-500 ml-1">*</span>
			</div>
			<input
				type="text"
				class="border rounded p-2 mt-3"
				bind:value={admin.name}
			/>
		</div>
		<div class="flex flex-col mt-5">
			<div class="flex">
				<span>휴대폰번호</span>
				<span class="text-red-500 ml-1">*</span>
			</div>
			<input
				type="text"
				class="border rounded p-2 mt-3"
				maxlength="13"
				value={formatPhone(admin.phone)}
				on:keyup={(e) => {
					admin.phone = extractNumberString(
						e.target.value
					);
				}}
			/>
		</div>
		<div class="flex flex-col mt-5">
			<span>비밀번호</span>
			<input
				type="password"
				class="border rounded p-2 mt-3"
				bind:value={admin.password}
			/>
		</div>
		<div class="flex flex-col mt-5">
			<span>비밀번호 확인</span>
			<input
				type="password"
				class="border rounded p-2 mt-3"
				bind:value={checkPassword}
			/>
		</div>
		<div class="flex justify-end">
			<Button
				classes="mt-5 p-3"
				onClick={() => {
					history.back();
				}}>취소</Button
			>
			<div class="mx-1" />

			<Button
				classes="mt-5 p-3 w-20"
				onClick={save}>저장</Button
			>
		</div>
	</div>
</section>
