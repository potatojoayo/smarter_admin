export function getColor(state) {
	switch (state) {
		case '전체':
			return 'bg-blue-100 border-blue-200 text-blue-900';
		case '간편주문':
			return 'bg-blue-200 border-blue-200 text-blue-900';
		case '충전요청':
			return 'bg-blue-200 border-blue-200 text-blue-900';
		case '무통장입금':
			return 'bg-red-200 border-red-200 text-red-800';
		case '결제완료':
			return 'bg-green-300 border-green-200 text-green-900';
		case '작업중':
			return 'bg-red-300 text-red-800 border-red-300';
		case '작업완료':
			return 'bg-green-300 text-green-800 border-green-300';
		case '전처리작업중':
			return 'bg-blue-600 text-white border-blue-600';
		case '전처리작업완료':
			return 'bg-green-600 text-white border-green-600';
		case '후작업중':
			return 'bg-blue-600 text-white border-blue-600';
		case '후작업완료':
			return 'bg-green-600 text-white border-green-600';
		case '외부작업':
		case '숨김':
			return 'bg-gray-500 text-white border-gray-500';
		case '추후배송':
			return 'bg-orange-300 border-orange-300 text-orange-900';
		case '출고준비':
			return 'bg-yellow-300 border-yellow-300 text-yellow-900';
		case '묶음배송':
			return 'bg-purple-300 border-purple-300 text-purple-900';
		case '취소완료':
			return 'bg-green-200 border-green-200 text-green-900';
		case '배송중':
			return 'bg-blue-300 border-blue-300 text-blue-900';
		case '배송완료':
			return 'bg-primary text-white border-primary';
		case '주문요청':
			return 'bg-red-200 border-red-200 text-red-800';
		case '주문완료':
			return 'bg-green-200 border-green-200 text-green-900';
		case '교환요청':
			return 'bg-red-200 border-red-200 text-red-800';
		case '교환완료':
			return 'bg-green-200 border-green-200 text-green-900';
		case '반품요청':
		case '주문취소':
		case '부분취소':
			return 'bg-red-200 border-red-200 text-red-800';
		case '반품완료':
			return 'bg-green-200 border-green-200 text-green-900';
		case '반품반려':
			return 'bg-purple-200 border-purple-200 text-purple-800';
		case '교환반려':
			return 'bg-purple-200 purple-red-200 text-purple-800';
		case '취소요청':
			return 'bg-red-200 border-red-200 text-red-800';
		case '판매중':
			return 'bg-green-100 border-green-100 text-green-900';
		case '품절':
			return 'bg-red-200 border-red-200 text-red-800';
		case '요청':
			return 'bg-red-200 border-red-200 text-red-800';
		case '완료':
			return 'bg-green-200 border-green-200 text-green-900';
		case '발주대기':
			return 'bg-orange-300 border-orange-300 text-orange-900';
		case '발주진행중':
			return 'bg-blue-300 border-blue-300 text-blue-900';
		case '부분종결':
			return 'bg-yellow-300 border-yellow-300 text-yellow-900';
		case '종결':
			return 'bg-green-200 border-green-200 text-green-900';
		case '방문수령':
			return 'bg-purple-200 border-purple-200 text-purple-900';
	}
}
