import type MenuElementType from './MenuElementType';

class MenuItemType {
	parent: MenuElementType;
	children: MenuElementType[] | undefined;

	constructor(
		parent: MenuElementType,
		children?: MenuElementType[] | undefined
	) {
		this.parent = parent;
		this.children = children;
	}
}

export default MenuItemType;
