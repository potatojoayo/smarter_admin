export function formatBusinessRegistrationNumber(
	businessRegistrationNumber,
	e
) {
	if (e && e.keyCode === 8) {
		return businessRegistrationNumber;
	}
	if (!businessRegistrationNumber) {
		return '';
	}
	businessRegistrationNumber =
		businessRegistrationNumber.replace(
			/[^0-9]/g,
			''
		);
	let tmp = '';
	if (businessRegistrationNumber.length < 4) {
		return businessRegistrationNumber;
	} else if (
		businessRegistrationNumber.length < 6
	) {
		tmp += businessRegistrationNumber.substring(
			0,
			3
		);
		tmp += '-';
		tmp +=
			businessRegistrationNumber.substring(3);
		return tmp;
	} else if (
		businessRegistrationNumber.length <= 10
	) {
		tmp += businessRegistrationNumber.substring(
			0,
			3
		);
		tmp += '-';
		tmp += businessRegistrationNumber.substring(
			3,
			5
		);
		tmp += '-';
		tmp +=
			businessRegistrationNumber.substring(5);
		return tmp;
	} else {
		tmp += businessRegistrationNumber.substring(
			0,
			3
		);
		tmp += '-';
		tmp += businessRegistrationNumber.substring(
			3,
			5
		);
		tmp += '-';
		tmp += businessRegistrationNumber.substring(
			5,
			10
		);
		return tmp;
	}
}
