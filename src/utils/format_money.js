function formatMoney(money) {
	if (!money && money !== 0) {
		return '';
	}
	return money
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
export default formatMoney;

