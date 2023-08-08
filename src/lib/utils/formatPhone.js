export function formatPhone(phone, e) {
	if (e && e.keyCode === 8) {
		return phone;
	}
	if (!phone) {
		return '';
	}
	phone = phone.replace(/[^0-9]/g, '');
	let tmp = '';
	if (phone.length < 4) {
		return phone;
	} else if (phone.length < 7) {
		tmp += phone.substring(0, 3);
		tmp += '-';
		tmp += phone.substring(3);
		return tmp;
	} else if (phone.length <= 11) {
		tmp += phone.substring(0, 3);
		tmp += '-';
		tmp += phone.substring(3, 7);
		tmp += '-';
		tmp += phone.substring(7);
		return tmp;
	} else {
		tmp += phone.substring(0, 3);
		tmp += '-';
		tmp += phone.substring(3, 7);
		tmp += '-';
		tmp += phone.substring(7, 11);
		return tmp;
	}
}
