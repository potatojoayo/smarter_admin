import { gql } from 'graphql-request';

export default class CommonService {
	static BankAccounts = gql`
		query BankAccounts {
			bankAccounts {
				bankName
				accountNo
				ownerName
			}
		}
	`;
	static DeleteFaq = gql`
		mutation DeleteFaq($faqId: Int) {
			deleteFaq(faqId: $faqId) {
				success
			}
		}
	`;
	static CreateOrUpdateFaq = gql`
		mutation CreateOrUpdateFaq(
			$faqId: Int
			$title: String
			$contents: String
		) {
			createOrUpdateFaq(
				faqId: $faqId
				title: $title
				contents: $contents
			) {
				success
			}
		}
	`;
	static DeleteNotice = gql`
		mutation DeleteNotice($noticeId: Int) {
			deleteNotice(noticeId: $noticeId) {
				success
			}
		}
	`;
	static CreateOrUpdateNotice = gql`
		mutation CreateOrUpdateNotice(
			$noticeId: Int
			$title: String
			$contents: String
		) {
			createOrUpdateNotice(
				noticeId: $noticeId
				title: $title
				contents: $contents
			) {
				success
			}
		}
	`;

	static DeliveryAgencies = gql`
		query DeliveryAgencies {
			deliveryAgencies {
				id
				name
				isDefault
				isActive
			}
		}
	`;

	static Notices = gql`
		query Notices($offset: Int) {
			notices(offset: $offset, first: 10) {
				totalCount
				edges {
					node {
						noticeId
						title
						contents
						dateCreated
						dateUpdated
						user {
							name
							identification
						}
					}
				}
			}
		}
	`;

	static Notifications = gql`
		query MyNotifications(
			$types: [String]
			$after: String
		) {
			myNotifications(
				notificationType_In: $types
				after: $after
				first: 10
			) {
				totalCount
				totalUnreadCount
				pageInfo {
					endCursor
				}
				edges {
					node {
						notificationId
						notificationType
						title
						contents
						dateCreated
						dateRead
					}
				}
			}
		}
	`;

	static ReadNotification = gql`
		mutation ReadNotification(
			$notificationId: Int
		) {
			readNotification(
				notificationId: $notificationId
			) {
				success
			}
		}
	`;

	static Faqs = gql`
		query Faqs(
			$offset: Int
			$dateFrom: DateTime
			$dateTo: DateTime
		) {
			faqs(
				dateCreated_Gte: $dateFrom
				dateCreated_Lte: $dateTo
				offset: $offset
				first: 10
			) {
				totalCount
				edges {
					node {
						faqId
						title
						contents
						dateCreated
						dateUpdated
						user {
							name
							identification
						}
					}
				}
			}
		}
	`;
}
