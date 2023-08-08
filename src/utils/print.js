let printDiv;
let initBody;

export function printElement(divId) {
	printDiv = document.getElementById(divId);

	window.onbeforeprint = beforePrint;
	window.onafterprint = afterPrint;

	window.print();
}

function beforePrint() {
	initBody = document.body.innerHTML;
	document.body.innerHTML = printDiv.innerHTML;
}

function afterPrint() {
	document.body.innerHTML = initBody;
}
