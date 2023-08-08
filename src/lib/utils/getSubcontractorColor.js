export function getSubcontractorColor(state) {
	switch (state) {
		case '전체':
			return 'bg-blue-100 border-blue-200 text-blue-900';
		case '로고작업실A':
			return 'bg-blue-200 text-blue-700 border-blue-200';
		case '로고작업실B':
			return 'bg-green-200 border-green-200 text-green-800';
		case '띠자수작업실':
			return 'bg-yellow-200 border-yellow-200 text-yellow-800';
		case '전처리작업실':
			return 'bg-red-400 border-red-400 text-white';
		case '무통장입금':
			return 'bg-red-200 border-red-200 text-red-800';
		case '결제완료':
			return 'bg-green-300 border-green-200 text-green-900';
		case '작업중':
			return 'bg-blue-600 text-white border-blue-600';
		case '전처리작업중':
			return 'bg-blue-600 text-white border-blue-600';
		case '전처리작업완료':
			return 'bg-green-600 text-white border-green-600';
		case '후작업중':
			return 'bg-blue-600 text-white border-blue-600';
		case '후작업완료':
			return 'bg-green-600 text-white border-green-600';
		case '외부작업실':
			return 'bg-gray-500 text-white border-gray-500';
		case '추후배송':
			return 'bg-orange-300 border-yellow-300 text-yellow-900';
		case '출고준비':
			return 'bg-yellow-300 border-yellow-300 text-yellow-900';
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
			return 'bg-red-200 border-red-200 text-red-800';
		case '반품완료':
			return 'bg-green-200 border-green-200 text-green-900';
		case '반품반려':
			return 'bg-purple-200 purple-red-200 text-purple-800';
		case '교환반려':
			return 'bg-purple-200 purple-red-200 text-purple-800';
		case '취소요청':
			return 'bg-red-200 border-red-200 text-red-800';
	}
}
