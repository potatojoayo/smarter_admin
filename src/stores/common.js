import HttpClient from '../data/providers/http_client';
import CommonService from '../data/services/common';

const http = HttpClient.getInstance();

export async function getBankAccounts() {
	const result = await http.request(
		CommonService.BankAccounts
	);
	return result.bankAccounts;
}

export async function getDeliveryAgencies() {
	const result = await http.request(
		CommonService.DeliveryAgencies
	);
	return result.deliveryAgencies;
}

export async function getNotices(page) {
	const result = await http.request(
		CommonService.Notices,
		{
			offset: (page - 1) * 10
		}
	);
	return {
		notices: result.notices.edges.map(
			(e) => e.node
		),
		totalCount: result.notices.totalCount
	};
}

export async function createOrUpdateNotice(
	notice
) {
	const result = await http.request(
		CommonService.CreateOrUpdateNotice,
		{
			noticeId: notice.noticeId,
			title: notice.title,
			contents: notice.contents
		}
	);
	return result.createOrUpdateNotice.success;
}

export async function deleteNotice(noticeId) {
	const result = await http.request(
		CommonService.DeleteNotice,
		{
			noticeId
		}
	);
	return result.deleteNotice.success;
}

export async function getFaqs(
	page,
	dateFrom,
	dateTo
) {
	const result = await http.request(
		CommonService.Faqs,
		{
			offset: (page - 1) * 10,
			dateFrom,
			dateTo
		}
	);
	return {
		faqs: result.faqs.edges.map((e) => e.node),
		totalCount: result.faqs.totalCount
	};
}

export async function createOrUpdateFaq(faq) {
	const result = await http.request(
		CommonService.CreateOrUpdateFaq,
		{
			faqId: faq.faqId,
			title: faq.title,
			contents: faq.contents
		}
	);
	return result.createOrUpdateFaq.success;
}

export async function deleteFaq(faqId) {
	const result = await http.request(
		CommonService.DeleteFaq,
		{
			faqId
		}
	);
	return result.deleteFaq.success;
}

export async function getNotifications(
	types,
	after
) {
	if (types === '전체') {
		types = null;
	} else {
		types = [types];
	}
	const result = await http.request(
		CommonService.Notifications,
		{
			types,
			after
		}
	);
	return {
		notifications:
			result.myNotifications.edges.map(
				(e) => e.node
			),
		totalCount: result.myNotifications.totalCount,
		endCursor:
			result.myNotifications.pageInfo.endCursor,
		totalUnreadCount:
			result.myNotifications.totalUnreadCount
	};
}

export async function readNotification(
	notificationId
) {
	const result = await http.request(
		CommonService.ReadNotification,
		{
			notificationId
		}
	);

	return result.readNotification.success;
}
