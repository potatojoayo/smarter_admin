export default class ProductMaster {
	id: number;
	name: string;
	priceGym: number;
	needDraft: boolean;

	constructor({
		id,
		needDraft,
		name,
		priceGym
	}: {
		id: number;
		name: string;
		priceGym: number;
		needDraft: boolean;
	}) {
		this.id = id;
		this.name = name;
		this.priceGym = priceGym;
		this.needDraft = needDraft;
	}
}
