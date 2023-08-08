<script>
	import SideBarItem from './SideBarItem.svelte';
	import MenuItem from '$lib/components/side_bar/MenuItem.svelte';
	import { menus } from '$lib/components/side_bar/menus';
	import {
		isSideBarOpened,
		toggleSideBar
	} from '../../../stores/sidebar.js';
	import { isPrinting } from '../../../stores/global_setting.js';
	import {
		agencyMenu,
		draftTeamMenu,
		shippingTeamMenu,
		subcontractorMenus
	} from './menus.js';

	export let user;

	let selectedMenu = menus;
	$: {
		if (user) {
			switch (user.group) {
				case '작업실':
					selectedMenu = subcontractorMenus;
					break;
				case '배송관리팀':
					selectedMenu = shippingTeamMenu;
					break;
				case '로고시안팀':
					selectedMenu = draftTeamMenu;
					break;
				case '체육사':
					selectedMenu = agencyMenu;
					break;
				default:
					selectedMenu = menus;
			}
		}
	}
</script>

<nav
	class="fixed flex flex-col top-0 xl:w-48 pt-4 left-0 z-20
	{$isSideBarOpened ? 'w-64' : 'w-0'}
	overflow-y-scroll bg-white h-screen border-r-[1px]
	transition-all whitespace-nowrap duration-500
	{$isPrinting ? 'invisible' : 'visible'}
"
>
	<button
		on:click|preventDefault={toggleSideBar}
		class="absolute right-5 top-4 text-xl text-gray-600 xl:invisible"
	>
		<i class="fa fa-chevron-left" />
	</button>
	<SideBarItem>
		<a
			href="/"
			class="text-xl flex flex-nowrap cursor-pointer mb-4 mt-4"
		>
			스마터 관리자
		</a>
	</SideBarItem>
	{#each selectedMenu as menu}
		<SideBarItem>
			<MenuItem menuItem={menu} />
		</SideBarItem>
	{/each}
</nav>
