export default class Product {
	id: number;
	color: string;
	size: string;
	priceAdditional: number;
	draftId?: number;
	studentNames?: string[];

	constructor({
		id,
		size,
		priceAdditional,
		color
	}: {
		id: number;
		color: string;
		size: string;
		priceAdditional: number;
	}) {
		this.id = id;
		this.color = color;
		this.priceAdditional = priceAdditional;
		this.size = size;
	}
}
