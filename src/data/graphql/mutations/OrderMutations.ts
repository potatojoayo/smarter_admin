import { gql } from 'graphql-request';

export default class OrderMutations {
	static CreateTaOrder(
		CreateTaOrder: any,
		variables: {
			gymId: number;
			orderedProducts: {
				productMasterId: number;
				productId: number;
				quantity: number;
				draftId?: number | undefined;
				studentNames?: string[] | undefined;
				userRequest?: string | undefined;
			}[];
			address: string;
			detailAddress: string;
			zipCode: string;
		}
	):
		| {
				createTaOrder: {
					success: boolean;
					message: string;
				};
		  }
		| PromiseLike<{
				createTaOrder: {
					success: boolean;
					message: string;
				};
		  }> {
		throw new Error('Method not implemented.');
	}
	static CsCancelOrder = gql`
		mutation CsCancelOrder($csRequestId: Int!) {
			csCancelOrder(csRequestId: $csRequestId) {
				success
				message
			}
		}
	`;

	static CreateReturnRequest = gql`
		mutation CreateReturnRequest(
			$memo: String
			$csRequestId: Int
			$orderDetails: [OrderDetailInputType]
			$returnReason: String
			$receiver: String
			$phone: String
			$zipCode: String
			$address: String
			$detailAddress: String
		) {
			createReturnRequest(
				memo: $memo
				csRequestId: $csRequestId
				orderDetails: $orderDetails
				returnReason: $returnReason
				receiver: $receiver
				phone: $phone
				zipCode: $zipCode
				address: $address
				detailAddress: $detailAddress
			) {
				success
				message
			}
		}
	`;

	static CsPartialCancel = gql`
		mutation CsPartialCancel(
			$csRequestId: Int
			$orderDetailIds: [Int]
		) {
			csPartialCancel(
				csRequestId: $csRequestId
				orderDetailIds: $orderDetailIds
			) {
				success
				message
			}
		}
	`;

	static AdditionalOrder = gql`
		mutation AdditionalOrder(
			$csRequestId: Int
			$orderedProducts: [OrderedProductInputType]
		) {
			additionalOrder(
				csRequestId: $csRequestId
				orderedProducts: $orderedProducts
			) {
				message
				success
			}
		}
	`;

	static SaveMemo = gql`
		mutation SaveMemo(
			$orderMasterId: Int
			$memo: String
		) {
			saveMemo(
				orderMasterId: $orderMasterId
				memo: $memo
			) {
				success
			}
		}
	`;
}
