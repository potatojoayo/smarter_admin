<script>
	import Button from '$lib/components/Button.svelte';
	import ErrorButton from '$lib/components/ErrorButton.svelte';
	import {
		createOrUpdateFaq,
		deleteFaq
	} from '../../../../stores/common.js';
	import Pagination from '$lib/components/Pagination.svelte';

	export let data;

	let faqs = data.faqs,
		totalCount = data.totalCount,
		selectedIndex = 0,
		user = data.me;

	$: user = data.me;
</script>

<main class="flex flex-col items-center">
	<section
		class="flex flex-col mt-3 min-h-[300px]"
	>
		<div class="flex">
			<div class="flex flex-col">
				<Button
					classes="h-fit mr-2 p-3"
					onClick={() => {
						faqs.push({
							title: '새 자주묻는 질문',
							isActive: true
						});
						faqs = faqs;
						selectedIndex = faqs.length - 1;
					}}>새 글 쓰기</Button
				>
			</div>
			<div
				class="flex flex-col border rounded-tl-lg rounded-bl-lg py-5 min-w-[300px]  items-center bg-white"
			>
				{#each faqs as faq, index}
					<div
						class="py-1 flex flex-col items-center text-md w-full  px-3 group relative cursor-pointer border-primary {selectedIndex ===
						index
							? 'bg-primary text-white'
							: 'hover:bg-gray-300'}
"
						on:click={(_) => {
							selectedIndex = index;
						}}
					>
						<div
							class="flex justify-center mx-auto text-md w-full  border-primary {selectedIndex ===
							index
								? 'bg-primary text-white'
								: 'hover:bg-gray-300'}
"
						>
							{faq.title}
						</div>
						<div
							class="flex justify-between w-full"
						>
							<div class="text-xs ">
								{faq.user
									? faq.user.name
									: user.name}
							</div>
							<div class="text-xs ">
								{faq.dateCreated
									? new Date(
											faq.dateCreated
									  ).toLocaleDateString()
									: '새 자주묻는 질문'}
							</div>
						</div>
					</div>
				{/each}
				<Pagination
					{totalCount}
					count={10}
					classes="mt-auto"
				/>
			</div>
			<div
				class="flex flex-col py-5 px-10 border-t border-r border-b rounded-tr-lg rounded-br-lg justify-between max-w-[500px] bg-white"
			>
				<div class="flex flex-col">
					<div class="flex flex-col">
						<div class="mb-1 text-sm">제목</div>
						<input
							class="rounded min-w-[250px]"
							type="text"
							bind:value={faqs[selectedIndex]
								.title}
							placeholder="제목을 입력해주세요"
						/>
					</div>
					<div class="my-2" />
					<div class="flex">
						<div class="flex flex-col">
							<div class="mb-1 text-xs">
								작성자
							</div>
							<div>
								{faqs[selectedIndex].user
									? faqs[selectedIndex].user.name
									: user.name}
							</div>
						</div>
						<div class="mx-5" />
						<div class="flex flex-col">
							<div class="mb-1 text-xs">
								작성날짜
							</div>
							<div>
								{faqs[selectedIndex].dateCreated
									? new Date(
											faqs[
												selectedIndex
											].dateCreated
									  ).toLocaleString()
									: '지금'}
							</div>
						</div>
					</div>

					<div class="my-2" />
					<div class="flex flex-col">
						<div class="mb-1 text-sm">내용</div>
						<textarea
							class="rounded min-w-[400px] resize-none h-[500px]"
							bind:value={faqs[selectedIndex]
								.contents}
							placeholder="내용을 입력해주세요"
						/>
					</div>
					<div class="w-full my-2" />
				</div>
			</div>
		</div>
		<div class="flex justify-end w-full mt-6">
			<ErrorButton
				classes="mr-2 w-20 "
				onClick={async () => {
					if (confirm('삭제하시겠습니까?')) {
						if (
							await deleteFaq(
								faqs[selectedIndex].faqId
							)
						) {
							alert('삭제되었습니다.');
							return location.reload();
						}
					}
				}}>삭제</ErrorButton
			>

			<Button
				classes="mr-2 w-20"
				onClick={async () => {
					if (!faqs[selectedIndex].contents) {
						return alert(
							`${faqs[selectedIndex].title}의 내용을 입력해주세요.`
						);
					}
					if (confirm('저장하시겠습니까?')) {
						if (
							await createOrUpdateFaq(
								faqs[selectedIndex]
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
</main>
