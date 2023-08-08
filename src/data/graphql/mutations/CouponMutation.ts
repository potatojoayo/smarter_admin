import { gql } from 'graphql-request';

export default class CouponMutation {
	static UpdateNewMemberCoupon = gql`
		mutation UpdateNewMemberCoupon($price: Int, $countPerIssue: Int, $expireDay: Int) {
			updateNewMemberCoupon(expireDay: $expireDay, countPerIssue: $countPerIssue, price: $price) {
				success
				couponMaster {
					id
					price
					countPerIssue
					type
					name
					expireDay
					totalIssuedCount
				}
			}
		}
	`;
	static UpdateReferralCoupon = gql`
		mutation UpdateReferralCoupon($price: Int, $countPerIssue: Int, $expireDay: Int) {
			updateReferralCoupon(expireDay: $expireDay, countPerIssue: $countPerIssue, price: $price) {
				success
				couponMaster {
					id
					price
					countPerIssue
					type
					name
					expireDay
					totalIssuedCount
				}
			}
		}
	`;

	static createManualCoupon = gql`
		mutation createCoupon($message: String, $name: String, $price: Int) {
			createCoupon(message: $message, name: $name, price: $price) {
				success
			}
		}
	`;
}
