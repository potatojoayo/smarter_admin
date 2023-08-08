<script>
	import Button from '../../../../../../lib/components/Button.svelte';
	import formatPhone from '../../../../../../utils/format_phone';
	import { formatBusinessRegistrationNumber } from '../../../../../../lib/utils/formatBusinessRegistrationNumber';
	import { createOrUpdateSubcontractor } from '../../../../../../stores/user.js';
	import extractNumberString from '$lib/utils/extractNumberString';
	export let data;
	let subcontractor = data.agency;
	let checkPassword;

	async function save() {
		if (
			!subcontractor.user.identification ||
			!subcontractor.name ||
			!subcontractor.user.name ||
			!subcontractor.user.phone
		) {
			return alert(
				'필수항목을 모두 입력해주세요.'
			);
		}
		if (subcontractor.user.password) {
			if (
				subcontractor.user.password !==
				checkPassword
			) {
				return alert(
					'비밀번호가 일치하지 않습니다.'
				);
			}
		}
		if (confirm('저장하시겠습니까?')) {
			let input = { ...subcontractor };
			input.id = input.subcontractorId;
			delete input.subcontractorId;
			input.businessRegistrationCertificate =
				input.businessRegistrationCertificateFile;
			delete input.businessRegistrationCertificateFile;
			if (input.user.userId) {
				input.user.id = input.user.userId;
				delete input.user.userId;
			}
			const result =
				await createOrUpdateSubcontractor(input);
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
				{#if !subcontractor.subcontractorId}
					<span class="text-red-500 ml-1">*</span>
				{/if}
			</div>
			{#if !subcontractor.subcontractorId}
				<input
					type="text"
					bind:value={subcontractor.user
						.identification}
					class="border rounded p-2 mt-3"
				/>
			{:else}
				<div class="text-lg mt-2">
					{subcontractor.user.identification}
				</div>
			{/if}
		</div>
		<div class="flex flex-col mt-5">
			<div class="flex">
				<span>작업실명</span>
				<span class="text-red-500 ml-1">*</span>
			</div>
			<input
				type="text"
				class="border rounded p-2 mt-3"
				bind:value={subcontractor.name}
			/>
		</div>
		<div class="flex flex-col mt-5">
			<div class="flex">
				<span>담당자명</span>
				<span class="text-red-500 ml-1">*</span>
			</div>
			<input
				type="text"
				class="border rounded p-2 mt-3"
				bind:value={subcontractor.user.name}
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
				value={formatPhone(
					subcontractor.user.phone
				)}
				on:keyup={(e) => {
					subcontractor.user.phone =
						extractNumberString(e.target.value);
				}}
			/>
		</div>
		<div class="flex flex-col mt-5">
			<span>비밀번호</span>
			<input
				type="password"
				class="border rounded p-2 mt-3"
				bind:value={subcontractor.user.password}
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
		<div class="flex mt-5 items-start">
			<div class="flex mr-5 w-10">
				<span>주소</span>
			</div>
			<div class="flex flex-col w-full">
				<div class="flex">
					<input
						type="text"
						disabled
						class="border rounded p-2 w-32 mr-3"
						bind:value={subcontractor.zipCode}
					/>
					<Button
						onClick={() => {
							new daum.Postcode({
								oncomplete: function (data) {
									subcontractor.zipCode =
										data.zonecode;
									subcontractor.address =
										data.roadAddress;
								}
							}).open();
						}}>주소검색</Button
					>
				</div>
				<input
					type="text"
					disabled
					class="border rounded p-2 mt-3"
					bind:value={subcontractor.address}
				/>
				<input
					type="text"
					class="border rounded p-2 mt-3"
					bind:value={subcontractor.detailAddress}
				/>
			</div>
		</div>

		<div class="flex flex-col mt-5">
			<div class="flex">
				<span>사업자 등록번호</span>
			</div>
			<input
				type="text"
				class="border rounded p-2 mt-3"
				maxlength="12"
				value={formatBusinessRegistrationNumber(
					subcontractor.businessRegistrationNumber
				)}
				on:keyup={(e) => {
					subcontractor.businessRegistrationNumber =
						extractNumberString(e.target.value);
				}}
			/>
		</div>
		<input
			id="file"
			type="file"
			class="w-[200px] text-sm mb-2 mt-5"
			on:change={(e) => {
				subcontractor.businessRegistrationCertificateFile =
					e.target.files[0];
				subcontractor.businessRegistrationCertificate =
					URL.createObjectURL(e.target.files[0]);
			}}
		/>
		{#if subcontractor.businessRegistrationCertificate}
			<div class="flex flex-col w-full mt-5">
				<span class="text-lg mb-3 ">
					사업자 등록증
				</span>
				<embed
					src={subcontractor.businessRegistrationCertificate}
					class="w-80 h-80 mx-auto"
				/>
			</div>
		{/if}
		<div class="flex justify-end">
			<Button
				classes="mt-5"
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
