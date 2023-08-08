import { gql } from 'graphql-request';

export default class ProductMutation {
	static ChangeDisplayOrder = gql`
		mutation ChangeDisplayOrder(
			$changingProductMasters: [ChangeDisplayOrderInputType]
		) {
			changeDisplayOrder(
				changingProductMasters: $changingProductMasters
			) {
				success
			}
		}
	`;
}
