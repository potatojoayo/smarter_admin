<script>
	import Button from '$lib/components/Button.svelte';
	import formatPhone from '../../../../../utils/format_phone';
	import ErrorButton from '$lib/components/ErrorButton.svelte';
	import { formatBusinessRegistrationNumber } from '$lib/utils/formatBusinessRegistrationNumber.js';
	import { updateGym } from '../../../../../stores/user.js';
	import DropdownSelect from '$lib/components/DropdownSelect.svelte';
	import AgencyDropdown from '$lib/components/user/AgencyDropdown.svelte';

	export let data;

	let gym = data.gym;

	async function save() {
		if (
			!gym.name ||
			!gym.user.name ||
			!gym.user.phone ||
			!gym.businessRegistrationNumber
		) {
			return alert(
				'필수항목을 모두 입력해주세요.'
			);
		}
		if (confirm('저장하시겠습니까?')) {
			let input = { ...gym };
			delete input.gymId;
			input.businessRegistrationCertificate =
				input.businessRegistrationCertificateFile;
			delete input.businessRegistrationCertificateFile;
			if (input.agency) {
				input.agencyId = input.agency.agencyId;
			}
			delete input.agency;
			input.user.id = input.user.userId;
			delete input.user.userId;

			const result = await updateGym(input);
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
				{#if !gym.gymId}
					<span class="text-red-500 ml-1">*</span>
				{/if}
			</div>
			{#if !gym.gymId}
				<input
					type="text"
					bind:value={gym.user.identification}
					class="border rounded p-2 mt-3"
				/>
			{:else}
				<div class="text-lg mt-2">
					{gym.user.identification}
				</div>
			{/if}
		</div>
		<div class="flex flex-col mt-5">
			<div class="flex">
				<span>체육관명</span>
				<span class="text-red-500 ml-1">*</span>
			</div>
			<input
				type="text"
				class="border rounded p-2 mt-3"
				bind:value={gym.name}
			/>
		</div>
		<div class="flex flex-col mt-5">
			<span>관할지사</span>
			<div class="mt-3">
				<AgencyDropdown bind:value={gym.agency} />
			</div>
		</div>
		<div class="flex flex-col mt-5">
			<div class="flex">
				<span>관장 이름</span>
				<span class="text-red-500 ml-1">*</span>
			</div>
			<input
				type="text"
				class="border rounded p-2 mt-3"
				bind:value={gym.user.name}
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
				value={formatPhone(gym.user.phone)}
				on:keyup={(e) => {
					gym.user.phone = extractNumberString(
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
				bind:value={gym.email}
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
						bind:value={gym.zipCode}
					/>
					<Button
						onClick={() => {
							new daum.Postcode({
								oncomplete: function (data) {
									gym.zipCode = data.zonecode;
									gym.address = data.roadAddress;
								}
							}).open();
						}}>주소검색</Button
					>
				</div>
				<input
					type="text"
					class="border rounded p-2 mt-3"
					disabled
					bind:value={gym.address}
				/>
				<input
					type="text"
					class="border rounded p-2 mt-3"
					bind:value={gym.detailAddress}
				/>
			</div>
		</div>
		<div class="flex flex-col mt-5">
			<div class="flex">
				<span>사업자 등록번호</span>
				<span class="text-red-500 ml-1">*</span>
			</div>
			<input
				type="text"
				class="border rounded p-2 mt-3"
				maxlength="12"
				value={formatBusinessRegistrationNumber(
					gym.businessRegistrationNumber
				)}
				on:keyup={(e) => {
					gym.businessRegistrationNumber =
						extractNumberString(e.target.value);
				}}
			/>
			<input
				id="file"
				type="file"
				class="w-[200px] text-sm mb-2 mt-5"
				on:change={(e) => {
					gym.businessRegistrationCertificateFile =
						e.target.files[0];
					gym.businessRegistrationCertificate =
						URL.createObjectURL(
							e.target.files[0]
						);
				}}
			/>
			{#if gym.businessRegistrationCertificate}
				<div class="flex flex-col w-full mt-5">
					<a
						href={gym.businessRegistrationCertificate}
						class="rounded border p-3 bg-primary text-white w-fit"
						download
						><i class="fa fa-download mr-2" /> 사업자등록증</a
					>
				</div>
			{/if}
		</div>
		<div class="flex flex-col mt-5">
			<div class="flex">
				<span>승인여부</span>
				<span class="text-red-500 ml-1">*</span>
			</div>
			<div class="flex mt-5">
				<label for="active" class="ml-3">
					<input
						type="radio"
						id="active"
						name="isActive"
						class="w-4"
						bind:group={gym.user.isActive}
						value={true}
					/>
					승인</label
				>
				<label for="inActive" class="ml-3">
					<input
						type="radio"
						id="inActive"
						name="isActive"
						class="ml-5 w-4"
						value={false}
						bind:group={gym.user.isActive}
					/>
					미승인</label
				>
			</div>

			<div class="flex flex-col mt-5">
				<div class="flex">
					<span>메모</span>
				</div>
				<textarea
					class="border rounded p-2 mt-3 resize-none"
					bind:value={gym.memo}
				/>
			</div>
		</div>
		<div class="flex justify-end">
			<ErrorButton
				classes="mt-5 p-4"
				onClick={() => {
					history.back();
				}}>취소</ErrorButton
			>
			<div class="mx-1" />
			<Button
				classes="mt-5 p-3 w-20"
				onClick={save}>저장</Button
			>
		</div>
	</div>
</section>
