<script>
	import Button from '$lib/components/Button.svelte';
	import { updateOrCreateBanner } from '../../../../stores/setting.js';
	import UploadImage from '$lib/components/UploadImage.svelte';
	import ErrorButton from '$lib/components/ErrorButton.svelte';

	export let data;

	let banners = data.banners;

	let selectedBanner;
	let selectedIndex = 0;
	let deletingBannerIds = [];
	$: {
		selectedBanner = banners[selectedIndex];
	}
</script>

<main class="flex flex-col items-center">
	<section
		class="flex flex-col mt-3 min-h-[300px]"
	>
		<div class="flex ">
			<div class="flex flex-col">
				<Button
					classes="h-fit mr-2 p-3"
					onClick={() => {
						let last = 0;
						for (let banner of banners) {
							if (last <= banner.order) {
								last = banner.order + 1;
							}
						}
						banners.push({
							name: '새 배너',
							order: last,
							image: null
						});
						banners = banners;
						selectedIndex = banners.length - 1;
					}}>새 배너 추가</Button
				>
				{#if selectedIndex > 0}
					<Button
						classes="h-fit mr-2 p-3 mt-3"
						onClick={() => {
							let preIndex = banners.findIndex(
								(b) =>
									b.order ===
									selectedBanner.order - 1
							);
							let temp = selectedBanner.order;
							banners[selectedIndex].order -= 1;
							banners[preIndex].order = temp;
							banners = banners.sort(
								(a, b) => a.order - b.order
							);
							selectedIndex -= 1;
						}}
						><i
							class="fa-regular fa-chevron-up"
						/></Button
					>
				{/if}
				{#if selectedIndex < banners.length - 1}
					<Button
						classes="h-fit mr-2 p-3 mt-3"
						onClick={() => {
							let afterIndex = banners.findIndex(
								(b) =>
									b.order ===
									selectedBanner.order + 1
							);
							let temp = selectedBanner.order;
							banners[selectedIndex].order += 1;
							banners[afterIndex].order = temp;
							banners = banners.sort(
								(a, b) => a.order - b.order
							);
							selectedIndex += 1;
						}}
						><i
							class="fa-regular fa-chevron-down"
						/></Button
					>
				{/if}
			</div>
			<div
				class="flex flex-col border rounded-tl-lg rounded-bl-lg py-5 min-w-[300px]  items-center bg-white"
			>
				{#each banners as banner, index}
					<div
						class="py-1 flex justify-center items-center text-md w-full  px-16 group relative cursor-pointer border-primary {selectedBanner.order ===
						banner.order
							? 'bg-primary text-white'
							: 'hover:bg-gray-300'}
"
						on:click={(_) => {
							selectedIndex = index;
						}}
					>
						<span class="pointer-events-none">
							{banner.name}
						</span>
					</div>
				{/each}
			</div>
			<div
				class="flex flex-col py-5 px-10 border-t border-r border-b rounded-tr-lg rounded-br-lg justify-between max-w-[500px] bg-white"
			>
				<div class="flex flex-col">
					<div class="flex flex-col">
						<div class="mb-1 text-sm">
							배너이름
						</div>
						<input
							class="rounded min-w-[250px]"
							type="text"
							bind:value={selectedBanner.name}
							placeholder="배너의 이름을 입력해주세요."
						/>
					</div>
					<div class="w-full my-2" />
					<UploadImage
						size="96"
						bind:image={selectedBanner.image}
						bind:file={selectedBanner.file}
					/>
				</div>
				<ErrorButton
					classes="flex-1 mr-2 w-20 ml-auto mt-10"
					onClick={async () => {
						if (
							confirm('배너를 삭제하시겠습니까?')
						) {
							let temp = selectedBanner.order;
							if (selectedBanner.id) {
								deletingBannerIds.push(
									selectedBanner.id
								);
							}
							banners = banners.filter(
								(b) => b.order !== temp
							);
							banners.forEach((b) => {
								if (b.order > temp) {
									b.order -= 1;
								}
							});
							banners = banners;
							if (
								selectedIndex >= banners.length
							) {
								selectedIndex -= 1;
							}
						}
					}}>삭제</ErrorButton
				>
			</div>
		</div>
		<Button
			classes="flex-1 mr-2 w-20 ml-auto mt-10"
			onClick={async () => {
				for (let banner of banners) {
					if (!banner.image) {
						return alert(
							`${banner.name}의 이미지를 등록해주세요.`
						);
					}
				}
				if (confirm('저장하시겠습니까?')) {
					if (
						await updateOrCreateBanner(
							banners,
							deletingBannerIds
						)
					) {
						alert('저장되었습니다.');
						return location.reload();
					}
					alert('실패');
				}
			}}>저장</Button
		>
	</section>
</main>
