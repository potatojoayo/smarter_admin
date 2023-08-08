import ParentCategory from '$data/classes/Category';
import ProductMutation from '$data/graphql/mutations/ProductMutation';
import HttpClient from '$data/providers/http_client';
import { gql } from 'graphql-request';

export default class ProductService {
	static async changeDisplayOrder(variables: {
		changingProductMasters: {
			productMasterId: number;
			displayOrder: number;
		}[];
	}) {
		const client = HttpClient.getInstance();

		const result = (await client.request(
			ProductMutation.ChangeDisplayOrder,
			variables
		)) as {
			changeDisplayOrder: {
				success: boolean;
			};
		};

		return result.changeDisplayOrder.success;
	}

	static async getCategories() {
		const Categories = gql`
			query Categories {
				categories(depth: 0) {
					name
					children {
						name
					}
				}
			}
		`;

		const client = HttpClient.getInstance();

		const result = (await client.request(
			Categories
		)) as {
			categories: {
				name: string;
				children: {
					name: string;
				}[];
			}[];
		};

		return result.categories.map(
			(c) => new ParentCategory(c)
		);
	}
}
