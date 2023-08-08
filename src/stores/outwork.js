import { writable } from 'svelte/store';

export const orderDetails = writable([
	{
		id: 1,
		orderId: 1,
		orderNumber: 'S201512321',
		name: '드래곤 품도복',
		productImage:
			'http://ksmarter.shop/upload/product/%E1%84%92%E1%85%B1%E1%86%AF%E1%84%85%E1%85%A1%E1%84%87%E1%85%A1%E1%86%AB%E1%84%87%E1%85%A1%E1%86%AB%E1%84%83%E1%85%A9%E1%84%87%E1%85%A9%E1%86%A8-%E1%84%92%E1%85%AA%E1%84%8B%E1%85%B5%E1%84%90%E1%85%B3%E1%84%87%E1%85%B3%E1%86%AF%E1%84%85%E1%85%A2%E1%86%A8-500.jpg',
		color: '화이트',
		size: '100',
		quantity: 5,
		workType: '로고마킹',
		needPreWork: true,
		state: '결제완료',
		subcontractorName: '외부작업실',
		names: [
			'한효범',
			'정재호',
			'정원호',
			'정철우',
			'윤창배'
		],
		workState: '진행중',
		draftImage:
			'https://ksmarter.shop/upload/member/%EB%8F%84%EB%B3%B5%EB%A7%88%ED%82%B91.png',
		buyerRequest:
			'폰트는 ~~로, 실색깔은 검정색으로 해주세요.',
		subcontractor: null,
		priceItem: 119500,
		priceTotalWork: 39000,
		memoByAdmin: '잘 부탁 드립니다.',
		memoBySubcontractor: '합해서 진행하겠습니다.',
		priceTotal: 148500,
		deliveryReceiver: '아무개',
		deliveryAddress:
			'광주 광산구 목련로 41 (산정동, 부영 애시앙)',
		detailDeliveryAddress: '203호',
		deliveryPhone: '010-3252-3069',
		zipCode: '62335',
		deliveryAgency: null,
		trackingNumber: null,
		deliveryPhoto: null,
		deliveryPhotoFile: null
	},
	{
		id: 2,
		orderId: 1,
		orderNumber: 'S201512321',
		name: '드래곤 품도복',
		productImage:
			'http://ksmarter.shop/upload/product/%E1%84%92%E1%85%B1%E1%86%AF%E1%84%85%E1%85%A1%E1%84%87%E1%85%A1%E1%86%AB%E1%84%87%E1%85%A1%E1%86%AB%E1%84%83%E1%85%A9%E1%84%87%E1%85%A9%E1%86%A8-%E1%84%92%E1%85%AA%E1%84%8B%E1%85%B5%E1%84%90%E1%85%B3%E1%84%87%E1%85%B3%E1%86%AF%E1%84%85%E1%85%A2%E1%86%A8-500.jpg',
		color: '화이트',
		size: '100',
		quantity: 5,
		workType: '로고마킹',
		subcontractorName: '외부작업실',
		needPreWork: false,
		state: '결제완료',
		subcontractor: null,
		names: [
			'한효범',
			'정재호',
			'정원호',
			'정철우',
			'윤창배'
		],
		draftImage:
			'https://ksmarter.shop/upload/member/%EB%8F%84%EB%B3%B5%EB%A7%88%ED%82%B91.png',
		workState: '',
		buyerRequest:
			'폰트는 ~~로, 실색깔은 검정색으로 해주세요.',
		priceItem: 119500,
		priceTotalWork: 39000,
		priceTotal: 148500,
		deliveryReceiver: '아무개',
		deliveryAddress:
			'광주 광산구 목련로 41 (산정동, 부영 애시앙)',
		detailDeliveryAddress: '203호',
		deliveryPhone: '010-3252-3069',
		zipCode: '62335',
		deliveryAgency: null,
		memoByAdmin: '잘 부탁 드립니다.',
		memoBySubcontractor: '합해서 진행하겠습니다.',
		trackingNumber: null,
		deliveryPhoto: null,
		deliveryPhotoFile: null
	},
	{
		id: 7,
		orderId: 1,
		orderNumber: 'S201512321',
		name: '드래곤 품띠',
		productImage:
			'http://ksmarter.shop/upload/product/%E1%84%92%E1%85%B1%E1%86%AF%E1%84%85%E1%85%A1%E1%84%87%E1%85%A1%E1%86%AB%E1%84%87%E1%85%A1%E1%86%AB%E1%84%83%E1%85%A9%E1%84%87%E1%85%A9%E1%86%A8-%E1%84%92%E1%85%AA%E1%84%8B%E1%85%B5%E1%84%90%E1%85%B3%E1%84%87%E1%85%B3%E1%86%AF%E1%84%85%E1%85%A2%E1%86%A8-500.jpg',
		color: '레드',
		size: '90',
		quantity: 2,
		workType: '로고마킹',
		subcontractorName: '외부작업실',
		state: '결제완료',
		needPreWork: false,
		names: [
			'한효범',
			'정재호',
			'정원호',
			'정철우',
			'윤창배'
		],
		subcontractor: null,
		draftImage:
			'https://ksmarter.shop/upload/member/%EB%8F%84%EB%B3%B5%EB%A7%88%ED%82%B91.png',
		workState: '진행중',
		priceItem: 119500,
		buyerRequest:
			'폰트는 ~~로, 실색깔은 검정색으로 해주세요.',
		priceTotalWork: 39000,
		priceTotal: 148500,
		deliveryReceiver: '아무개',
		deliveryAddress:
			'광주 광산구 목련로 41 (산정동, 부영 애시앙)',
		detailDeliveryAddress: '203호',
		deliveryPhone: '010-3252-3069',
		zipCode: '62335',
		deliveryAgency: null,
		memoByAdmin: '잘 부탁 드립니다.',
		memoBySubcontractor: '합해서 진행하겠습니다.',
		trackingNumber: null,
		deliveryPhoto: null,
		deliveryPhotoFile: null
	},
	{
		id: 3,
		orderId: 2,
		orderNumber: 'S201512321',
		name: '드래곤 품도복',
		productImage:
			'http://ksmarter.shop/upload/product/%E1%84%92%E1%85%B1%E1%86%AF%E1%84%85%E1%85%A1%E1%84%87%E1%85%A1%E1%86%AB%E1%84%87%E1%85%A1%E1%86%AB%E1%84%83%E1%85%A9%E1%84%87%E1%85%A9%E1%86%A8-%E1%84%92%E1%85%AA%E1%84%8B%E1%85%B5%E1%84%90%E1%85%B3%E1%84%87%E1%85%B3%E1%86%AF%E1%84%85%E1%85%A2%E1%86%A8-500.jpg',
		color: '화이트',
		size: '100',
		quantity: 5,
		workType: '로고마킹',
		names: [
			'한효범',
			'정재호',
			'정원호',
			'정철우',
			'윤창배'
		],
		buyerRequest:
			'폰트는 ~~로, 실색깔은 검정색으로 해주세요.',
		needPreWork: true,
		subcontractor: null,
		state: '교환신청',
		workState: '',
		subcontractorName: '외부작업실',
		priceItem: 119500,
		priceTotalWork: 39000,
		priceTotal: 148500,
		deliveryReceiver: '아무개',
		deliveryAddress:
			'광주 광산구 목련로 41 (산정동, 부영 애시앙)',
		detailDeliveryAddress: '203호',
		deliveryPhone: '010-3252-3069',
		zipCode: '62335',
		deliveryAgency: null,
		trackingNumber: null,
		deliveryPhoto: null,
		deliveryPhotoFile: null
	}
]);
