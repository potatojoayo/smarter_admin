export function getFormattedDate(order) {
	const orderDate = new Date(order.dateCreated);

	const year = orderDate.getFullYear();
	const month = orderDate.getMonth() + 1; // 0부터 시작하므로 1을 더함
	const day = orderDate.getDate();

	let hours = orderDate.getHours();
	let minutes = orderDate.getMinutes();
	let seconds = orderDate.getSeconds();

	// 시간, 분, 초가 한 자리 숫자인 경우 앞에 0을 추가하여 2자리로 만들기
	if (hours < 10) {
		hours = '0' + hours;
	}

	if (minutes < 10) {
		minutes = '0' + minutes;
	}

	if (seconds < 10) {
		seconds = '0' + seconds;
	}

	const formattedDate =
		year +
		'-' +
		month +
		'-' +
		day +
		' ' +
		hours +
		':' +
		minutes +
		':' +
		seconds;
	return formattedDate;
}
