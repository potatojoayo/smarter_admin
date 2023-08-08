import { writable } from 'svelte/store';

export const admin = writable({
	id: 1,
	businessName: '(주) 이리스',
	manager: '아무개',
	phone: '010-5132-5132',
	fax: '053-1513-2131',
	email: 'iris@google.com',
	receiveAddress: '전남 나주시 태평로 23-1 3층'
});
