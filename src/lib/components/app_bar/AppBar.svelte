<script>
	import { toggleSideBar } from '../../../stores/sidebar.js';
	import { page } from '$app/stores';
	import { isPrinting } from '../../../stores/global_setting.js';
	import Notification from './Notification.svelte';
	import UserService from '$data/services/UserService';
	import { goto } from '$app/navigation';
	import Button from '../buttons/Button.svelte';

	export let user;

	let title = '홈';
	$: {
		let menu = $page.url.pathname;
		if (menu.includes('/home/')) {
			title = '홈';
		} else if (menu.includes('/order')) {
			title = '주문목록';
			if (menu.includes('/detail')) {
				title = '주문상세';
				if (menu.includes('/work')) {
					title = '작업지시서';
				}
			} else if (menu.includes('/easy')) {
				title = '간편주문';
				if (menu.includes('/create')) {
					title = '주문생성';
				}
			} else if (menu.includes('/outwork')) {
				title = '외부작업';
			} else if (menu.includes('/cancel')) {
				title = '주문취소';
			} else if (menu.includes('/claim')) {
				title = '교환 / 반품';
			}
		} else if (menu.includes('/delivery')) {
			title = '출고관리';
		} else if (menu.includes('/work')) {
			title = '작업관리';
			if (menu.includes('outwork')) {
				title = '외부작업';
			}
		} else if (menu.includes('/product')) {
			title = '상품관리';
			if (menu.includes('/category')) {
				title = '카테고리 관리';
			} else if (menu.includes('/brand')) {
				title = '브랜드 관리';
			} else if (menu.includes('/edit')) {
				title = '상품등록 및 수정';
			}
		} else if (menu.includes('/inventory')) {
			title = '재고관리';
			if (menu.includes('/supplier')) {
				title = '거래처 관리';
			} else if (menu.includes('/history')) {
				title = '재고변동표';
			} else if (menu.includes('/purchase')) {
				title = '발주';
				if (menu.includes('/form')) {
					title = '발주서';
				} else if (menu.includes('/receive')) {
					title = '입고하기';
				}
			} else if (menu.includes('/receive')) {
				title = '입고';
				if (menu.includes('detail')) {
					title = '입고상세';
				}
			}
		} else if (menu.includes('/user')) {
			title = '체육관';
			if (menu.includes('/logo')) {
				title = '회원 로고';
			} else if (menu.includes('/membership')) {
				title = '회원 등급';
			} else if (menu.includes('/admin')) {
				title = '관리자';
				if (menu.includes('/edit')) {
					title = '관리자 추가 및 수정';
				}
			} else if (menu.includes('/agency')) {
				title = '지사';
				if (menu.includes('/edit')) {
					title = '지사 추가 및 수정';
				}
			} else if (
				menu.includes('/subcontractor')
			) {
				title = '작업실';
				if (menu.includes('/edit')) {
					title = '작업실 추가 및 수정';
				}
			} else if (menu.includes('/draft')) {
				title = '시안 요청';
			} else if (menu.includes('/money')) {
				title = '스마터머니';
				if (menu.includes('/condition')) {
					title = '스마터머니 유저별 현황';
				} else if (menu.includes('/list')) {
					title = '스마터머니 내역';
				} else if (menu.includes('/charge')) {
					title = '스마터머니 충전';
				}
			}
		} else if (menu.includes('calculate')) {
			title = '이리스 정산';
			if (menu.includes('subcontractor')) {
				title = '작업실 정산';
			}
		} else if (menu.includes('statistic')) {
			if (menu.includes('business')) {
				title = '업체별 통계';
			} else if (menu.includes('prods')) {
				title = '상품별 통계';
			} else {
				title = '작업실 통계';
			}
		} else if (menu.includes('/setting')) {
			if (menu.includes('/notice')) {
				title = '공지사항';
			} else if (menu.includes('faq')) {
				title = '자주묻는 질문';
			} else if (menu.includes('banner')) {
				title = '배너 설정';
			} else if (menu.includes('account')) {
				title = '계좌 및 배송 설정';
			} else if (menu.includes('membership')) {
				title = '회원등급 설정';
			}
		}
	}

	async function logout() {
		if (!confirm('로그아웃 하시겠습니까?'))
			return;
		await UserService.deleteTokenCookies();
		goto('/login');
	}
</script>

<header
	class="flex justify-between items-center h-16 fixed bg-white w-full xl:w-[calc(100%-192px)] xl:left-48 px-16 border-b z-20
	{$isPrinting ? 'invisible' : 'visible'}
"
>
	<div class="flex items-center">
		<button
			on:click|preventDefault={toggleSideBar}
		>
			<i
				class="fa fa-bars mr-3 text-xl lg:invisible lg:mr-0 lg:w-0"
			/>
		</button>
		<span class="text-2xl cursor-default">
			{title}
		</span>
	</div>
	<div class="flex">
		<Button
			on:click={logout}
			text="로그아웃"
			red
		/>
		<div class="mx-5" />
		<Notification {user} />
	</div>
</header>
