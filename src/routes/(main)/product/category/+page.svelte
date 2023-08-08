<script>
	import Button from '$lib/components/Button.svelte';
	import { saveCategories } from '../../../../stores/product.js';

	let tempId = -2;
	let fromParentIndex;
	let fromChildIndex;
	let toParentIndex;
	let toChildIndex;

	export let data;
	let categories = data.categories;
	let sortedCategories;
	$: {
		sortedCategories = categories.sort(
			(a, b) => a.order - b.order
		);
	}

	let deletingCategoryIds = [];

	let parent;

	let selectedCategory;

	async function save() {
		if (confirm('카테고리를 저장할까요?')) {
			const result = await saveCategories(
				categories,
				deletingCategoryIds
			);
			if (result.productExists) {
				alert(
					'상품이 등록된 카테고리는 삭제할 수 없습니다.'
				);
				return location.reload();
			}
			alert('카테고리가 저장되었습니다.');
		}
	}

	function deleteCategory() {
		if (selectedCategory.id > 0) {
			deletingCategoryIds.push(
				selectedCategory.id
			);
		}
		if (selectedCategory.depth === 1) {
			let parentIndex = categories.findIndex(
				(c) => c.id === parent.id
			);
			let children =
				categories[parentIndex].children;
			children = children.filter(
				(c) => c.id !== selectedCategory.id
			);
			children.forEach((c) => {
				if (c.order > selectedCategory.order) {
					c.order -= 1;
				}
			});
			categories[parentIndex].children = children;
		} else {
			categories = categories.filter(
				(c) => c.id !== selectedCategory.id
			);
			categories.forEach((c) => {
				if (c.order > selectedCategory.order) {
					c.order -= 1;
				}
			});
		}
		if (selectedCategory.depth === 1) {
			if (selectedCategory.order > 0) {
				selectedCategory = parent.children.find(
					(c) =>
						c.order === selectedCategory.order - 1
				);
			} else {
				selectedCategory = parent;
			}
		} else {
			selectedCategory = categories.find(
				(c) =>
					c.order === selectedCategory.order - 1
			);
		}
	}

	function onClickParent(category) {
		parent = category;
		selectedCategory = category;
	}

	function onClickChild(category, child) {
		parent = category;
		selectedCategory = child;
	}

	function createNewCategory(child = false) {
		let order = 0;
		let lastCategory;
		if (child) {
			if (parent.children.length > 0) {
				lastCategory =
					parent.children[
						parent.children.length - 1
					];
				order = lastCategory.order + 1;
			}
		} else {
			if (categories.length > 0) {
				lastCategory =
					categories[categories.length - 1];
				order = lastCategory.order + 1;
			}
		}
		return {
			id: tempId--,
			name: '새 카테고리',
			depth: child ? 1 : 0,
			order: order,
			children: []
		};
	}

	function createNewParent() {
		const newCategory = createNewCategory();
		categories.push(newCategory);
		categories = categories;
		selectedCategory = newCategory;
		parent = newCategory;
	}

	function createNewChild() {
		const newCategory = createNewCategory(true);
		categories
			.find((c) => c.id === parent.id)
			.children.push(newCategory);
		categories = categories;
		selectedCategory = newCategory;
	}

	function onDragStart(e) {
		fromParentIndex = e.target.getAttribute(
			'data-parentIndex'
		);
		fromChildIndex = e.target.getAttribute(
			'data-childIndex'
		);
	}
	function onParentDragOver(e) {
		e.preventDefault();
		toParentIndex = e.target.getAttribute(
			'data-parentIndex'
		);
		toChildIndex = e.target.getAttribute(
			'data-childIndex'
		);
		if (!fromChildIndex) {
			e.target.classList.add('border-b-2');
		} else {
			e.target.classList.add('bg-gray-200');
		}
	}

	function onChildDragOver(e) {
		e.preventDefault();
		toParentIndex = e.target.getAttribute(
			'data-parentIndex'
		);
		toChildIndex = e.target.getAttribute(
			'data-childIndex'
		);
		if (fromChildIndex) {
			e.target.classList.add('border-b-2');
		}
	}
	function onDragLeave(e) {
		e.target.classList.remove('bg-gray-200');
		e.target.classList.remove('border-b-2');
	}

	function onDrop(e) {
		e.preventDefault();
		let fromElement;
		if (fromChildIndex) {
			fromElement =
				categories[fromParentIndex].children[
					fromChildIndex
				];
		} else {
			fromElement = categories[fromParentIndex];
		}
		let toElement;
		if (toChildIndex) {
			toElement =
				categories[toParentIndex].children[
					toChildIndex
				];
		} else {
			toElement = categories[toParentIndex];
		}

		e.target.classList.remove('bg-gray-200');
		e.target.classList.remove('border-b-2');
		if (!fromElement || !toElement) {
			return;
		}
		if (fromElement === toElement) {
			return;
		}

		if (fromChildIndex && toChildIndex) {
			if (fromParentIndex !== toParentIndex) {
				changeParent(fromElement, toElement);
			} else {
				insertBelowChild(fromElement, toElement);
			}
		}
		if (!fromChildIndex && !toChildIndex) {
			insertBelowParent(fromElement, toElement);
		}
		if (
			fromChildIndex &&
			toParentIndex &&
			!toChildIndex
		) {
			insertToParent(fromElement, toElement);
		}
		categories = [...categories];
	}

	function insertBelowChild(
		fromElement,
		toElement
	) {
		if (
			fromElement.order ===
			toElement.order + 1
		) {
			return;
		}
		let temp = toElement.order;
		if (fromElement.order < toElement.order) {
			for (let child of categories[
				fromParentIndex
			].children) {
				if (
					child.order > fromElement.order &&
					child.order <= toElement.order
				) {
					child.order -= 1;
				}
			}
			fromElement.order = temp;
		} else {
			for (let child of categories[
				fromParentIndex
			].children) {
				if (
					child.order > toElement.order &&
					child.order < fromElement.order
				) {
					child.order += 1;
				}
			}
			fromElement.order = temp + 1;
		}
	}

	function insertBelowParent(
		fromElement,
		toElement
	) {
		if (!fromElement || !toElement) {
			return;
		}
		let temp = toElement.order;

		if (fromElement.order < toElement.order) {
			for (let c of categories) {
				if (
					c.order > fromElement.order &&
					c.order <= toElement.order
				) {
					c.order -= 1;
				}
			}
			fromElement.order = temp;
		} else {
			for (let c of categories) {
				if (
					c.order > toElement.order &&
					c.order < fromElement.order
				) {
					c.order += 1;
				}
			}
			fromElement.order = temp + 1;
		}
	}

	function insertToParent(
		fromElement,
		toElement
	) {
		const fromParentElement =
			categories[fromParentIndex];
		fromParentElement.children =
			fromParentElement.children.filter(
				(item) => item.order !== fromElement.order
			);
		let minOrder = 100;
		for (let fromChild of fromParentElement.children) {
			if (minOrder > fromChild.order) {
				minOrder = fromChild.order;
			}
		}
		for (let fromChild of fromParentElement.children) {
			fromChild.order -= minOrder;
		}
		const toChildren = toElement.children.sort(
			(a, b) => b.order - a.order
		);
		if (toChildren.length > 0) {
			fromElement.order = toChildren[0].order + 1;
		} else {
			fromElement.order = 0;
		}
		parent = toElement;
		toElement.children.push(fromElement);
	}

	function changeParent(fromElement, toElement) {
		const fromParentElement =
			categories[fromParentIndex];
		const toParentElement =
			categories[toParentIndex];

		fromParentElement.children =
			fromParentElement.children.filter(
				(item) => item.order !== fromElement.order
			);
		for (let fromChild of fromParentElement.children) {
			if (fromChild.order > fromElement.order) {
				fromChild.order -= 1;
			}
		}
		for (let toChild of toParentElement.children) {
			if (toChild.order > toElement.order) {
				toChild.order += 1;
			}
		}
		parent = toParentElement;
		fromElement.order = toElement.order + 1;
		toParentElement.children.push(fromElement);
	}
</script>

<main class="flex flex-col items-center">
	<section class="flex flex-row mt-3">
		<div class="flex flex-col">
			<Button
				classes="w-36 mr-3"
				onClick={createNewParent}
				>새 카테고리</Button
			>
			<Button
				classes="w-36 mr-3 mt-3"
				onClick={createNewChild}
				>새 하위 카테고리</Button
			>
		</div>
		<div
			class="flex flex-col border rounded-tl-lg rounded-bl-lg py-5 min-w-[300px] max-h-[700px] overflow-y-scroll bg-white"
		>
			{#each sortedCategories as category, parentIndex}
				<div
					class="py-1 flex items-center text-md  px-16 group relative cursor-pointer border-primary {selectedCategory &&
					selectedCategory.id === category.id
						? 'bg-primary text-white'
						: 'hover:bg-gray-300'}
"
					draggable="true"
					on:click={() => onClickParent(category)}
					on:dragover={onParentDragOver}
					on:dragleave={onDragLeave}
					on:dragstart={onDragStart}
					on:drop={onDrop}
					data-parentIndex={parentIndex}
				>
					<span class="absolute left-2">
						<i
							class="fa fa-grip-dots-vertical group-hover:visible invisible cursor-grab"
						/>
					</span>
					<i class="fa-regular fa-folder mr-2" />
					<span class="pointer-events-none">
						{category.name}
					</span>
				</div>
				<div>
					{#each category.children.sort((a, b) => a.order - b.order) as child, childIndex}
						<div
							class="py-1 flex items-center text-md px-20 relative group select-none active:cursor-grabbing border-primary cursor-pointer
							{selectedCategory &&
							selectedCategory.id === child.id
								? 'bg-primary text-white'
								: 'hover:bg-gray-300'}
"
							draggable="true"
							data-childIndex={childIndex}
							data-parentIndex={parentIndex}
							on:dragstart={onDragStart}
							on:dragover={onChildDragOver}
							on:dragleave={onDragLeave}
							on:drop={onDrop}
							on:click={() =>
								onClickChild(category, child)}
						>
							<span class="absolute left-2">
								<i
									class="fa fa-grip-dots-vertical group-hover:visible invisible cursor-grab "
								/>
							</span>
							<span class="mr-1"> ㄴ </span>
							<span class="pointer-events-none">
								{child.name}
							</span>
						</div>
					{/each}
				</div>
			{/each}
		</div>
		<div
			class="flex flex-col py-5 px-10 border-t border-r border-b rounded-tr-lg rounded-br-lg min-w-[300px] justify-between min-h-[300px] bg-white"
		>
			<div class="block">
				<div class="mb-3">카테고리명</div>
				<input
					type="text"
					placeholder={selectedCategory
						? selectedCategory.name
						: ''}
					value={selectedCategory
						? selectedCategory.name
						: ''}
					class="border-b"
					on:input={(e) => {
						if (!selectedCategory) {
							return;
						}
						if (selectedCategory.depth === 1) {
							categories
								.find((c) => c.id === parent.id)
								.children.find(
									(c) =>
										c.id === selectedCategory.id
								).name = e.target.value;
						} else {
							categories.find(
								(c) =>
									c.id === selectedCategory.id
							).name = e.target.value;
						}
						categories = categories;
					}}
				/>
			</div>
			<div class="flex justify-between">
				<Button
					classes="hover:bg-error hover:border-error flex-1 mr-2 {selectedCategory &&
					(categories.length > 1 ||
						selectedCategory.depth === 1)
						? 'visible'
						: 'invisible'}"
					onClick={deleteCategory}>삭제</Button
				>
				<Button
					classes="flex-1 mr-2"
					onClick={save}>저장</Button
				>
			</div>
		</div>
	</section>
</main>
