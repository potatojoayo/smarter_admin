<script>
	import Button from '../../../../../../lib/components/Button.svelte';
	import { createSupplier } from '../../../../../../stores/inventory.js';
	import InputText from '../../../../../../lib/components/InputText.svelte';
	import ErrorButton from '../../../../../../lib/components/ErrorButton.svelte';
	import { formatPhone } from '../../../../../../lib/utils/formatPhone.js';
	import { formatBusinessRegistrationNumber } from '../../../../../../lib/utils/formatBusinessRegistrationNumber';
	import extractNumberString from '$lib/utils/extractNumberString';

	export let data;
	let supplier = data.supplier;

	const save = async () => {
		if (!supplier.name) {
			alert('거래처명을 입력해주세요.');
			return;
		}
		if (!supplier.address) {
			alert('주소를 입력해주세요.');
			return;
		}
		if (!supplier.manager) {
			alert('매니저이름을 입력해주세요.');
			return;
		}
		if (!supplier.phone) {
			alert('전화번호를 입력해주세요.');
			return;
		}

		if (confirm('거래처를 저장할까요?')) {
			const requestSupplier = {
				...supplier
			};

			requestSupplier.phone = extractNumberString(
				requestSupplier.phone
			);

			requestSupplier.fax = extractNumberString(
				requestSupplier.fax
			);

			requestSupplier.businessRegistrationNumber =
				extractNumberString(
					requestSupplier.businessRegistrationNumber
				);

			requestSupplier.businessRegistrationCertificateFile =
				undefined;

			if (
				typeof requestSupplier.businessRegistrationCertificateFile ===
				'string'
			) {
				// 파일이 아닌 경우 (새로 등록하지 않은 경우)
				requestSupplier.businessRegistrationCertificate =
					undefined;
			} else {
				// 새로운 파일을 등록한 경우
				requestSupplier.businessRegistrationCertificate =
					document.querySelector(
						'input#file'
					).files[0];
			}
			await createSupplier(requestSupplier);
			await alert('거래처가 저장되었습니다.');
			history.back();
		}
	};
</script>

<main class="flex justify-center">
	<section
		class="flex flex-row mt-3 min-h-[300px] justify-center"
	>
		<div
			class="flex flex-col py-5 px-10 rounded shadow min-w-[450px] justify-between"
		>
			<div class="flex flex-col">
				<div class="flex flex-col">
					<div class="flex">
						<div class="mb-3 text-sm">
							거래처명
						</div>
						<span class="text-red-500 ml-1"
							>*</span
						>
					</div>
					<InputText
						bind:value={supplier.name}
						maxlength="50"
					/>
				</div>
				<div class="flex flex-col my-4">
					<div class="flex">
						<div class="mb-3 text-sm">주소</div>
						<span class="text-red-500 ml-1"
							>*</span
						>
					</div>
					<InputText
						maxlength="100"
						bind:value={supplier.address}
					/>
				</div>
				<div class="flex flex-col">
					<div class="flex">
						<div class="mb-3 text-sm">
							매니저 이름
						</div>
						<span class="text-red-500 ml-1"
							>*</span
						>
					</div>
					<InputText
						maxlength="10"
						bind:value={supplier.manager}
					/>
				</div>
				<div class="flex flex-col my-4 text-sm">
					<div class="flex">
						<div class="mb-3 text-sm">
							전화번호
						</div>
						<span class="text-red-500 ml-1"
							>*</span
						>
					</div>
					<InputText
						value={formatPhone(supplier.phone)}
						maxlength="13"
						onKeyUp={(e) => {
							supplier.phone =
								extractNumberString(
									e.target.value
								);
						}}
					/>
				</div>
				<div class="flex flex-col my-4 text-sm">
					<div class="mb-3">팩스 번호</div>
					<InputText
						bind:value={supplier.fax}
						onKeyUp={(_) => {
							supplier.fax = supplier.fax.replace(
								/[^0-9]/g,
								''
							);
						}}
					/>
				</div>
				<div class="flex flex-col my-4">
					<div class="mb-3 text-sm">이메일</div>
					<InputText
						maxlength="100"
						bind:value={supplier.email}
					/>
				</div>
				<div class="flex flex-col my-4">
					<div class="mb-3 text-sm">
						사업자 등록번호
					</div>
					<InputText
						maxlength="12"
						value={formatBusinessRegistrationNumber(
							supplier.businessRegistrationNumber
						)}
						onKeyUp={(e) => {
							supplier.businessRegistrationNumber =
								extractNumberString(
									e.target.value
								);
						}}
					/>
				</div>
				<input
					id="file"
					type="file"
					class="w-[200px] text-sm mb-2"
					on:change={(e) => {
						supplier.businessRegistrationCertificateFile =
							e.target.files[0];
						supplier.businessRegistrationCertificate =
							URL.createObjectURL(
								e.target.files[0]
							);
					}}
				/>
				{#if supplier.businessRegistrationCertificate}
					<div class="flex flex-col w-full mt-5">
						<span class="text-lg mb-3 ">
							사업자 등록증
						</span>
						<embed
							src={supplier.businessRegistrationCertificate}
							class="w-40 mx-auto"
						/>
					</div>
				{/if}
			</div>
			<div class="flex justify-end mt-5">
				<ErrorButton
					classes="w-20 p-3"
					onClick={() => {
						history.back();
					}}>취소</ErrorButton
				>
				<div class="mx-1" />
				<Button classes="w-20 p-3" onClick={save}
					>저장</Button
				>
			</div>
		</div>
	</section>
</main>

<div class="my-10" />
