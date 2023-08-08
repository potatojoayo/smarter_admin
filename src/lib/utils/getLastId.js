export function getLastId(list) {
	let lastId = 0;
	for (let item of list) {
		if (lastId < item.id) {
			lastId = item.id;
		}
		if (item.children) {
			for (let child of item.children) {
				if (lastId < child.id) {
					lastId = child.id;
				}
			}
		}
	}
	return lastId;
}
