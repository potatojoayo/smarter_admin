export function dateToIsoDateString(
	date: Date | string
) {
	if (!date) {
		return '-';
	}
	if (typeof date === 'string') {
		return date.substring(0, 10);
	}
	let temp = date
		.toLocaleDateString("ko-KR")
		.replaceAll('.', '/')
	let [year, month, day] = temp.split('/');
	if (month.length === 1) {
		month = '0' + month;
	}
	if (day.length === 1) {
		day = '0' + day;
	}
	return `${year.trim()}-${month.trim()}-${day.trim()}`;
}





