<script>
	import Button from '../../../../../../lib/components/Button.svelte';
	import formatPhone from '../../../../../../utils/format_phone';
	import { formatBusinessRegistrationNumber } from '../../../../../../lib/utils/formatBusinessRegistrationNumber';
	import { createOrUpdateAgency } from '../../../../../../stores/user.js';
	import extractNumberString from '$lib/utils/extractNumberString';
	export let data;
	let agency = data.agency;
	let checkPassword;

	async function save() {
		if (
			!agency.user.identification ||
			!agency.name ||
			!agency.user.name ||
			!agency.user.phone
		) {
			return alert(
				'필수항목을 모두 입력해주세요.'
			);
		}
		if (agency.user.password) {
			if (
				agency.user.password !== checkPassword
			) {
				return alert(
					'비밀번호가 일치하지 않습니다.'
				);
			}
		}
		if (confirm('저장하시겠습니까?')) {
			let input = { ...agency };
			input.id = agency.agencyId;
			delete input.agencyId;
			input.businessRegistrationCertificate =
				input.businessRegistrationCertificateFile;
			delete input.businessRegistrationCertificateFile;
			input.user.id = input.user.userId;
			delete input.user.userId;

			const result = await createOrUpdateAgency(
				input
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
				{#if !agency.agencyId}
					<span class="text-red-500 ml-1">*</span>
				{/if}
			</div>
			{#if !agency.agencyId}
				<input
					type="text"
					bind:value={agency.user.identification}
					class="border rounded p-2 mt-3"
				/>
			{:else}
				<div class="text-lg mt-2">
					{agency.user.identification}
				</div>
			{/if}
		</div>
		<div class="flex flex-col mt-5">
			<div class="flex">
				<span>지사명</span>
				<span class="text-red-500 ml-1">*</span>
			</div>
			<input
				type="text"
				class="border rounded p-2 mt-3"
				bind:value={agency.name}
			/>
		</div>
		<div class="flex flex-col mt-5">
			<div class="flex">
				<span>대표자명</span>
				<span class="text-red-500 ml-1">*</span>
			</div>
			<input
				type="text"
				class="border rounded p-2 mt-3"
				bind:value={agency.user.name}
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
				value={formatPhone(agency.user.phone)}
				on:keyup={(e) => {
					agency.user.phone = extractNumberString(
						e.target.value
					);
				}}
			/>
		</div>
		<div class="flex flex-col mt-5">
			<div class="flex">
				<span>이메일</span>
			</div>
			<input
				type="text"
				class="border rounded p-2 mt-3"
				bind:value={agency.email}
				autocomplete="off"
			/>
		</div>
		<div class="flex flex-col mt-5">
			<span>비밀번호</span>
			<input
				type="text"
				class="border rounded p-2 mt-3 pw"
				bind:value={agency.user.password}
				autocomplete="off"
			/>
		</div>
		<div class="flex flex-col mt-5">
			<span>비밀번호 확인</span>
			<input
				type="text"
				class="border rounded p-2 mt-3 pw"
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
						bind:value={agency.zipCode}
					/>
					<Button
						onClick={() => {
							new daum.Postcode({
								oncomplete: function (data) {
									agency.zipCode = data.zonecode;
									agency.address =
										data.roadAddress;
									agency.region = data.sigungu;
								}
							}).open();
						}}>주소검색</Button
					>
				</div>
				<input
					type="text"
					disabled
					class="border rounded p-2 mt-3"
					bind:value={agency.address}
				/>
				<input
					type="text"
					class="border rounded p-2 mt-3"
					bind:value={agency.detailAddress}
				/>
			</div>
		</div>
		<div class="flex flex-col mt-5">
			<span>지역</span>
			<input
				type="text"
				disabled
				class="border rounded p-2 mt-3"
				bind:value={agency.region}
			/>
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
					agency.businessRegistrationNumber
				)}
				on:keyup={(e) => {
					agency.businessRegistrationNumber =
						extractNumberString(e.target.value);
				}}
			/>
		</div>
		<input
			id="file"
			type="file"
			class="w-[200px] text-sm mb-2 mt-5"
			on:change={(e) => {
				agency.businessRegistrationCertificateFile =
					e.target.files[0];
				agency.businessRegistrationCertificate =
					URL.createObjectURL(e.target.files[0]);
			}}
		/>
		{#if agency.businessRegistrationCertificate}
			<div class="flex flex-col w-full mt-5">
				<a
					href={agency.businessRegistrationCertificate}
					class="rounded border p-3 bg-primary text-white w-fit"
					download
					><i class="fa fa-download mr-2" /> 사업자등록증</a
				>
			</div>
		{/if}
		<div class="flex flex-col mt-5">
			<div class="flex">
				<span>메모</span>
			</div>
			<textarea
				class="border rounded p-2 mt-3 resize-none"
				bind:value={agency.memo}
			/>
		</div>
		<div class="flex justify-end">
			<Button
				classes="mt-5"
				onClick={() => {
					history.back();
				}}>취소</Button
			>
			<div class="mx-1" />

			<Button classes="mt-5" onClick={save}
				>저장</Button
			>
		</div>
	</div>
</section>

<style>
	input.pw {
		-webkit-text-security: disc;
	}
</style>
