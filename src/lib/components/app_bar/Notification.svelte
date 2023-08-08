<script>
	import {
		getNotifications,
		readNotification
	} from '../../../stores/common.js';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	export let user;

	let open = false;
	let types = [];
	let selectedType;
	let notifications = [];
	let totalCount = 0;
	let totalUnreadCount = 0;
	let endCursor;
	function getIcon(type) {
		switch (type) {
			case '간편주문':
				return 'fa-solid fa-cart-shopping-fast';
			case '교환요청':
				return 'fa-solid fa-arrows-retweet';
			case '반품요청':
				return 'fa-solid fa-reply';
			case '재고부족':
				return 'fa-solid fa-store-slash';
			case '작업실배정':
				return 'fa-solid fa-paint-roller';
			case '작업완료':
				return 'fa-solid fa-badge-check';
			case '출고준비':
				return 'fa-solid fa-hand-holding-box';
			case '추후배송요청':
				return 'fa-solid fa-truck-clock';
			case '시안요청':
				return 'fa-solid fa-uniform-martial-arts';
			case '묶음배송':
				return 'fa-solid fa-cubes';
		}
	}
	function getUrl(type) {
		switch (type) {
			case '간편주문':
				return '/order/easy';
			case '교환요청':
			case '반품요청':
				return '/order/claim';
			case '재고부족':
				return '/inventory';
			case '작업실 배정':
				return '/work';
			case '작업완료':
				return '/order?state=후작업완료';
			case '출고준비중':
				return '/delivery?state=출고준비';
		}
	}

	$: {
		let u = user;
		if (u && types.length === 0) {
			switch (u.group) {
				case '관리자':
				// types = [
				// 	'전체',
				// 	'간편주문',
				// 	'교환요청',
				// 	'반품요청',
				// 	'재고부족',
				// 	'작업완료'
				// ];
				// break;
				case '작업실':
					types = ['작업실배정'];
					break;
				case '배송관리팀':
					types = [
						'전체',
						'출고준비',
						'묶음배송',
						'추후배송요청'
					];
					break;
				case '로고시안팀':
					types = ['시안요청'];
					break;
			}
			selectedType = types[0];
		}
	}

	onMount(() => {
		setInterval(() => {
			if (user) {
				getNotifications(selectedType).then(
					(result) => {
						notifications = result.notifications;
						totalCount = result.totalCount;
						endCursor = result.endCursor;
						if (result.totalUnreadCount) {
							totalUnreadCount =
								result.totalUnreadCount;
						}
					}
				);
			}
		}, 60000);
	});

	$: {
		if (user) {
			getNotifications(selectedType).then(
				(result) => {
					notifications = result.notifications;
					totalCount = result.totalCount;
					endCursor = result.endCursor;
					if (result.totalUnreadCount) {
						totalUnreadCount =
							result.totalUnreadCount;
					}
				}
			);
		}
	}
</script>

<div class="relative z-30">
	<i
		class="fa fa-bell text-2xl  cursor-pointer"
		on:click|stopPropagation={() => {
			open = !open;
			const windowClickHandler = () => {
				open = false;
			};
			if (open) {
				window.addEventListener(
					'click',
					windowClickHandler
				);
			} else {
				window.removeEventListener(
					'click',
					windowClickHandler
				);
			}
		}}
	/>
	{#if totalUnreadCount > 0}
		<div
			class="absolute top-[-3px] right-[-8px] w-5 h-5 bg-red-400 rounded-xl text-[8px] text-white text-center flex items-center justify-center"
		>
			{totalUnreadCount}
		</div>
	{/if}
	{#if open}
		<div
			class="absolute right-0 min-w-[500px] min-h-[500px] shadow top-[130%] bg-white rounded p-5"
			on:click|stopPropagation={() => {}}
		>
			<span class="text-xl"> 알림 </span>
			<!-- <div class="flex mt-5">
				{#each types as type}
					<div
						class="px-4 border-b-2 cursor-pointer h-8 whitespace-nowrap {selectedType ===
						type
							? 'text-primary border-primary'
							: ''}"
						on:click={() => {
							selectedType = type;
						}}
					>
						{type}
					</div>
				{/each}
			</div> -->
			<div class="my-2" />
			<div
				class=" overflow-y-scroll max-h-[600px]"
			>
				{#each notifications as notification}
					<div
						class="flex p-3 items-center rounded hover:bg-gray-200 cursor-pointer"
						on:click={async () => {
							if (!notification.dateRead) {
								notification.dateRead =
									new Date();
								totalUnreadCount -= 1;
								await readNotification(
									notification.notificationId
								);
							}
							goto(
								getUrl(
									notification.notificationType
								)
							);
						}}
					>
						<div class="flex">
							<div
								class="bg-yellow-400 rounded-full p-2 w-10 h-10 flex items-center justify-center relative"
							>
								<i
									class="{getIcon(
										notification.notificationType
									)} text-yellow-700  text-lg"
								/>
								<div
									class="w-2 h-2 bg-error rounded-full absolute top-[-5px] right-[-5px] {notification.dateRead
										? 'invisible'
										: 'visible'}"
								/>
							</div>
						</div>
						<div class="mx-2" />
						<div class="flex-col">
							<div class="text-xs text-gray-600">
								{notification.title}
							</div>
							<div class="">
								{notification.contents}
							</div>
						</div>
						<div class="mx-2" />
					</div>
				{/each}
				{#if totalCount > notifications.length}
					<div
						class="text-primary text-center mt-5 cursor-pointer"
						on:click={() => {
							getNotifications(
								selectedType,
								endCursor
							).then((result) => {
								notifications = [
									...notifications,
									...result.notifications
								];
								totalCount = result.totalCount;
								endCursor = result.endCursor;
							});
						}}
					>
						더 보기
					</div>
				{/if}
			</div>
		</div>
	{/if}
</div>
