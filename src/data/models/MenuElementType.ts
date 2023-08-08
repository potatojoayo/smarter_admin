class MenuElementType {
	title!: String;
	path: String | undefined;
	icon: String;

	constructor(
		title: String,
		path?: String | undefined,
		icon: String = ''
	) {
		this.title = title;
		this.path = path;
		this.icon = icon;
	}
}

export default MenuElementType;
