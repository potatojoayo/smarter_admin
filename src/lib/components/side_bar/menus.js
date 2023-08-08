import MenuItemType from '../../../data/models/MenuItemType';
import MenuElementType from '../../../data/models/MenuElementType';

export const menus = [
	new MenuItemType(
		new MenuElementType(
			'주문관리',
			'/order',
			'fa-solid fa-scroll'
		),
		[]
	),
	new MenuItemType(
		new MenuElementType(
			'간편주문',
			'/order/easy',
			'fa-solid fa-cart-shopping-fast'
		),
		[]
	),
	new MenuItemType(
		new MenuElementType(
			'출고관리',
			'/delivery',
			'fa-duotone fa-box-taped'
		),
		[]
	),
	new MenuItemType(
		new MenuElementType(
			'작업관리',
			'/work',
			'fa fa-tools'
		),
		[
			/*
			new MenuElementType('작업목록', '/work'),
			new MenuElementType(
				'외부작업',
				'/work/outwork'
			)
			*/
		]
	),
	new MenuItemType(
		new MenuElementType(
			'상품관리',
			undefined,
			'fa-solid fa-bags-shopping'
		),
		[
			new MenuElementType('상품관리', '/product'),
			new MenuElementType(
				'카테고리 관리',
				'/product/category'
			),
			new MenuElementType(
				'브랜드 관리',
				'/product/brand'
			)
		]
	),
	new MenuItemType(
		new MenuElementType(
			'로고시안',
			'/user/draft',
			'fa-duotone fa-palette'
		),
		[]
	),

	new MenuItemType(
		new MenuElementType(
			'스마터머니',
			undefined,
			'fa-solid fa-sack-dollar'
		),
		[
			new MenuElementType(
				'스마터머니 내역',
				'/user/money/list'
			),
			new MenuElementType(
				'유저별 현황',
				'/user/money/condition'
			),
			new MenuElementType(
				'스마터머니 충전',
				'/user/money'
			)
		]
	),
	new MenuItemType(
		new MenuElementType(
			'재고관리',
			undefined,
			'fa-solid fa-shelves'
		),
		[
			new MenuElementType(
				'재고관리',
				'/inventory'
			),
			new MenuElementType(
				'재고변동표',
				'/inventory/history'
			),
			new MenuElementType(
				'발주',
				'/inventory/purchase'
			),
			new MenuElementType(
				'입고',
				'/inventory/receive'
			),

			new MenuElementType(
				'거래처 관리',
				'/inventory/supplier'
			)
		]
	),
	new MenuItemType(
		new MenuElementType(
			'회원관리',
			undefined,
			'fa fa-users'
		),
		[
			new MenuElementType('체육관', '/user'),
			new MenuElementType('지사', '/user/agency'),
			new MenuElementType(
				'작업실',
				'/user/subcontractor'
			)
		]
	),
	new MenuItemType(
		new MenuElementType(
			'정산하기',
			undefined,
			'fa-solid fa-sack-dollar'
		),
		[
			new MenuElementType(
				'이리스 정산',
				'/calculate'
			),
			new MenuElementType(
				'작업실 정산',
				'/calculate/subcontractor'
			)
		]
	),
	new MenuItemType(
		new MenuElementType(
			'통계',
			undefined,
			'fa-solid fa-chart-pie'
		),
		[
			new MenuElementType(
				'업체별 통계',
				'/statistic/business/vendor'
			),
			new MenuElementType(
				'상품별 통계',
				'/statistic/prods'
			),
			new MenuElementType(
				'작업실 통계',
				'/statistic/subcontractor'
			)
		]
	),
	new MenuItemType(
		new MenuElementType(
			'설정',
			undefined,
			'fa-solid fa-gear'
		),
		[
			new MenuElementType(
				'관리자',
				'/user/admin'
			),
			new MenuElementType(
				'공지사항',
				'/setting/notice'
			),
			new MenuElementType(
				'자주묻는 질문',
				'/setting/faq'
			),
			new MenuElementType(
				'배너',
				'/setting/banner'
			),
			new MenuElementType(
				'계좌 및 배송',
				'/setting/account_delivery'
			),
			new MenuElementType(
				'회원등급',
				'/setting/membership'
			)
		]
	)
];

export const subcontractorMenus = [
	new MenuItemType(
		new MenuElementType(
			'작업관리',
			'/work',
			'fa fa-tools'
		),
		[]
	)
];

export const shippingTeamMenu = [
	new MenuItemType(
		new MenuElementType(
			'출고관리',
			'/delivery',
			'fa-duotone fa-box-taped'
		),
		[]
	)
];

export const draftTeamMenu = [
	new MenuItemType(
		new MenuElementType(
			'시안요청',
			'/user/draft',
			'fa-duotone fa-palette'
		),
		[]
	)
];

export const agencyMenu = [
	new MenuItemType(
		new MenuElementType(
			'주문관리',
			'/order',
			'fa-solid fa-scroll'
		),
		[]
	),
	new MenuItemType(
		new MenuElementType(
			'소속 체육관',
			'/user',
			'fa fa-users'
		),
		[]
	),
	new MenuItemType(
		new MenuElementType(
			'정산',
			'/calculate',
			'fa-solid fa-sack-dollar'
		),
		[]
	)
];
