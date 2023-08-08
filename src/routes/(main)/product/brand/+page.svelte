<script>
	import Button from '$lib/components/Button.svelte';
	import { saveBrands } from '../../../../stores/product.js';

	let fromIndex;
	let toIndex;
	let tempId = -2;

	export let data;
	let brands = data.brands;

	let deletingBrandIds = [];
	let selectedBrand = brands[0];

	$: sortedBrand = brands.sort(
		(a, b) => a.order - b.order
	);

	function deleteBrand() {
		brands = brands.filter(
			(s) => s.id !== selectedBrand.id
		);
		if (selectedBrand.id > 0) {
			deletingBrandIds.push(selectedBrand.id);
		}
		brands.forEach((b) => {
			if (b.order > selectedBrand.order) {
				b.order -= 1;
			}
		});
		if (selectedBrand.order < brands.length - 1) {
			selectedBrand = brands.find(
				(s) => s.order === selectedBrand.order
			);
		} else {
			selectedBrand = brands.find(
				(s) => s.order === selectedBrand.order - 1
			);
		}
	}

	async function save() {
		if (confirm('브랜드를 저장할까요?')) {
			const result = await saveBrands(
				brands,
				deletingBrandIds
			);
			if (result.productExists) {
				alert(
					'상품이 등록된 브랜드는 삭제할 수 없습니다.'
				);
				return location.reload();
			}
			brands = result.brands;
			alert('브랜드가 저장되었습니다.');
		}
	}

	function onDragStart(e) {
		fromIndex =
			e.target.getAttribute('data-index');
	}
	function onDragOver(e) {
		e.preventDefault();
		toIndex = e.target.getAttribute('data-index');
		e.target.classList.add('border-b-2');
	}

	function onDragLeave(e) {
		e.target.classList.remove('border-b-2');
	}

	function onDrop(e) {
		e.preventDefault();
		let fromElement = brands[fromIndex];
		let toElement = brands[toIndex];

		e.target.classList.remove('border-b-2');
		if (!fromElement || !toElement) {
			return;
		}
		if (fromElement === toElement) {
			return;
		}

		insertBelow(fromElement, toElement);

		brands = brands;
	}

	function insertBelow(fromElement, toElement) {
		if (
			fromElement.order ===
			toElement.order + 1
		) {
			return;
		}
		let temp = toElement.order;
		if (fromElement.order < toElement.order) {
			for (let brand of brands) {
				if (
					brand.order > fromElement.order &&
					brand.order <= toElement.order
				) {
					brand.order -= 1;
				}
			}
			fromElement.order = temp;
		} else {
			for (let brand of brands) {
				if (brand.order > toElement.order) {
					brand.order += 1;
				}
			}
			fromElement.order = temp + 1;
		}
	}
</script>

<main class="flex flex-col items-center">
	<section
		class="flex flex-row mt-3 min-h-[300px] "
	>
		<Button
			classes="w-32 mr-3 h-fit"
			onClick={(_) => {
				const lastBrand =
					sortedBrand[sortedBrand.length - 1];
				const newBrand = {
					id: tempId--,
					name: '새 브랜드',
					order: lastBrand.order + 1
				};
				brands.push(newBrand);
				brands = brands;
				selectedBrand = newBrand;
			}}>새 브랜드</Button
		>
		<div
			class="flex flex-col items-center border rounded-tl-lg rounded-bl-lg py-5 min-w-[300px] max-h-[700px] overflow-y-scroll bg-white"
		>
			{#each sortedBrand as brand, index}
				<div
					class="py-1 flex items-center justify-center w-full text-md  px-16 group relative cursor-pointer border-primary {selectedBrand &&
					selectedBrand.id === brand.id
						? 'bg-primary text-white'
						: 'hover:bg-gray-300'}
"
					draggable="true"
					on:click={(_) => {
						selectedBrand = brand;
					}}
					on:dragover={onDragOver}
					on:dragleave={onDragLeave}
					on:dragstart={onDragStart}
					on:drop={onDrop}
					data-index={index}
				>
					<span class="absolute left-2">
						<i
							class="fa fa-grip-dots-vertical group-hover:visible invisible cursor-grab"
						/>
					</span>
					<span class="pointer-events-none">
						{brand.name}
					</span>
				</div>
			{/each}
		</div>
		<div
			class="flex flex-col py-5 px-10 border-t border-r border-b rounded-tr-lg rounded-br-lg min-w-[300px] justify-between bg-white"
		>
			<div class="block">
				<div class="mb-3">브랜드명</div>
				<input
					type="text"
					value={selectedBrand
						? selectedBrand.name
						: ''}
					class="border-b"
					on:input={(e) => {
						brands.find(
							(b) => b.id === selectedBrand.id
						).name = e.target.value;
						brands = brands;
					}}
				/>
			</div>
			<div class="flex justify-between">
				<Button
					classes="hover:bg-error hover:border-error flex-1 mr-2 {selectedBrand &&
					brands.length > 1
						? 'visible'
						: 'invisible'}"
					onClick={deleteBrand}>삭제</Button
				>
				<Button
					classes="flex-1 mr-2"
					onClick={save}>저장</Button
				>
			</div>
		</div>
	</section>
</main>
