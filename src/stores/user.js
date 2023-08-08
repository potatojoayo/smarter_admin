import { writable } from 'svelte/store';
import {
	isLoading,
	isOverlayOpened
} from './global_setting.js';
import HttpClient from '../data/providers/http_client';
import UserService from '../data/services/user';
import mixpanel from 'mixpanel-browser';

const http = HttpClient.getInstance();

export const isSelectDraftDialogOpen =
	writable(false);

export const selectedRequest = writable();

export function openSelectDraftDialog(request) {
	isSelectDraftDialogOpen.set(true);
	isOverlayOpened.set(true);
	selectedRequest.set(request);
}

export function closeSelectDraftDialog() {
	isSelectDraftDialogOpen.set(false);
	isOverlayOpened.set(false);
	selectedRequest.set(null);
}

export async function getChargeOrders(
	state,
	page,
	keyword
) {
	let offset = (+page - 1) * 20;
	const result = await http.request(
		UserService.ChargeOrders,
		{ state, offset, keyword }
	);

	return {
		chargeOrders: result.chargeOrders.edges.map(
			(e) => e.node
		),
		totalCount: result.chargeOrders.totalCount
	};
}

export async function getWallets(variables) {
	const result = await http.request(
		UserService.Wallets,
		variables
	);
	return {
		wallets: result.wallets.wallets,
		totalCount: result.wallets.totalCount
	};
}

export async function getGymsSmarterMoneyHistories(
	variables
) {
	const result = await http.request(
		UserService.GymsSmarterMoneyHistories,
		variables
	);
	return {
		gymsSmarterMoneyHistories:
			result.gymsSmarterMoneyHistories
				.smarterMoneyHistories,
		totalCount:
			result.gymsSmarterMoneyHistories.totalCount
	};
}

export async function chargeSmarterMoney(
	orderId,
	userId
) {
	if (
		confirm(
			'선택하신 요청을 결제완료처리 하시겠습니까?'
		)
	) {
		const result = await http.request(
			UserService.ChargeSmarterMoney,
			{
				orderId,
				userId
			}
		);

		if (result.chargeSmarterMoney.success) {
			alert(
				'선택하신 요청이 결제완료처리 되었습니다.'
			);
			location.reload();
		} else {
			alert('실패');
		}
	}
}

export async function bulkChargeSmarterMoney(
	orders
) {
	if (
		confirm(
			'체크하신 요청을 결제완료처리 하시겠습니까?'
		)
	) {
		const inputList = orders.map((o) => {
			return {
				orderId: o.orderId,
				userId: o.user.userId
			};
		});
		const result = await http.request(
			UserService.BulkChargeSmarterMoney,
			{
				orders: inputList
			}
		);

		if (
			result.bulkChargeSmarterMoney.successCount >
			0
		) {
			alert(
				`${result.bulkChargeSmarterMoney.successCount}건의 요청이 결제완료처리 되었습니다.`
			);
			inputList.forEach((i) => {
				mixpanel.track(
					'스마터머니 무통장입금 결제 확인',
					{ ...i }
				);
			});
			location.reload();
		} else {
			alert('실패');
		}
	}
}

export async function getGyms(
	page,
	dateFrom,
	dateTo,
	membership,
	keyword,
	hasDraft
) {
	switch (hasDraft) {
		case '전체':
			hasDraft = null;
			break;
		case '로고시안 보유':
			hasDraft = true;
			break;
		case '로고시안 미보유':
			hasDraft = false;
			break;
		default:
			hasDraft = null;
	}
	if (membership === '전체') membership = '';
	isLoading.set(true);
	const result = await http.request(
		UserService.Gyms,
		{
			offset: (page - 1) * 20,
			dateFrom,
			dateTo,
			membership,
			keyword,
			hasDraft
		}
	);
	isLoading.set(false);

	return {
		gyms: result.gyms.edges.map((e) => e.node),
		totalCount: result.gyms.totalCount
	};
}

export async function getGym(id) {
	const result = await http.request(
		UserService.Gym,
		{ id }
	);
	return result.gym;
}

export async function getAgencies(
	page,
	dateFrom,
	dateTo,
	keyword,
	first
) {
	isLoading.set(true);
	let offset = 0;
	if (page) {
		offset = (page - 1) * 20;
	}
	const result = await http.request(
		UserService.Agencies,
		{
			offset,
			dateFrom,
			dateTo,
			name: keyword,
			first
		}
	);
	const agencies = result.agencies.edges.map(
		(e) => e.node
	);
	isLoading.set(false);
	const totalCount = result.agencies.totalCount;
	return { agencies, totalCount };
}

export async function getAgency(id) {
	const result = await http.request(
		UserService.Agency,
		{ id }
	);
	return result.agency;
}

export async function createOrUpdateAgency(
	agency
) {
	const result = await http.request(
		UserService.CreateOrUpdateAgency,
		{ agency }
	);
	return {
		success: result.createOrUpdateAgency.success,
		duplicated:
			result.createOrUpdateAgency.duplicated
	};
}

export async function updateGym(gym) {
	const result = await http.request(
		UserService.UpdateGym,
		{ gym }
	);
	return {
		success: result.updateGym.success
	};
}

export async function getDrafts({ userId }) {
	const result = await http.request(
		UserService.GymDrafts,
		{ userId }
	);
	return result.drafts;
}

export async function createDraft(userId, draft) {
	const result = await http.request(
		UserService.CreateDraft,
		{ userId, draft }
	);
	return {
		success: result.createDraft.success,
		draft: result.createDraft.draft
	};
}

export async function createMultipleDrafts({
	userId,
	draft,
	categoryName,
	subCategoryName
}) {
	const result = await http.request(
		UserService.CreateMultipleDrafts,
		{
			userId,
			draft,
			categoryName,
			subCategoryName
		}
	);
	return {
		success: result.createMultipleDrafts.success
	};
}

export async function deleteMultipleDrafts({
	userId,
	categoryName,
	subCategoryName
}) {
	const result = await http.request(
		UserService.DeleteMultipleDrafts,
		{
			userId,
			categoryName,
			subCategoryName
		}
	);
	return {
		success: result.deleteMultipleDrafts.success
	};
}

export async function updateDrafts(
	userId,
	drafts
) {
	const result = await http.request(
		UserService.UpdateDrafts,
		{ userId, drafts }
	);
	return {
		success: result.updateDrafts.success
	};
}

export async function deleteDrafts(
	deletedDraftIds
) {
	const result = await http.request(
		UserService.DeleteDrafts,
		{ deletedDraftIds }
	);
	return result.deleteDrafts.success;
}

export async function getAdmins(page, keyword) {
	isLoading.set(true);
	const result = await http.request(
		UserService.Admins,
		{
			offset: (page - 1) * 20,
			keyword
		}
	);
	isLoading.set(false);
	return {
		admins: result.users.edges.map((e) => e.node),
		totalCount: result.users.totalCount
	};
}

export async function getAdmin(id) {
	const result = await http.request(
		UserService.Admin,
		{ id }
	);
	return result.user;
}

export async function createOrUpdateAdmin(
	user,
	group
) {
	const result = await http.request(
		UserService.CreateOrUpdateAdmin,
		{ user, group }
	);
	return {
		success: result.createOrUpdateAdmin.success,
		duplicated:
			result.createOrUpdateAdmin.duplicated
	};
}

export async function createOrUpdateDraft({
	userId,
	draft,
	subCategory
}) {
	const result = await http.request(
		UserService.CreateOrUpdateDraft,
		{
			userId,
			draft,
			subCategory
		}
	);
	return {
		success: result.createOrUpdateDraft.success,
		draft: result.createOrUpdateDraft.draft
	};
}

export async function getSubcontractorUsers(
	page,
	keyword
) {
	isLoading.set(true);
	const result = await http.request(
		UserService.SubcontractorUsers,
		{
			offset: (page - 1) * 20,
			keyword
		}
	);
	isLoading.set(false);
	return {
		subcontractors:
			result.subcontractorNodes.edges.map(
				(e) => e.node
			),
		totalCount:
			result.subcontractorNodes.totalCount
	};
}

export async function getSubcontractorUser(id) {
	const result = await http.request(
		UserService.SubcontractorUser,
		{ id }
	);
	return result.subcontractor;
}

export async function createOrUpdateSubcontractor(
	subcontractor
) {
	const result = await http.request(
		UserService.CreateOrUpdateSubcontractor,
		{ subcontractor }
	);
	return {
		success:
			result.createOrUpdateSubcontractor.success,
		duplicated:
			result.createOrUpdateSubcontractor
				.duplicated
	};
}

export async function todayDraftRequestCountByState(
	state
) {
	const result = await http.request(
		UserService.TodayDraftRequestCountByState,
		{ state }
	);
	return result.todayDraftRequestCountByState;
}

export async function todayChargeOrderCountByState(
	state
) {
	const result = await http.request(
		UserService.TodayChargeOrderCountByState,
		{ state }
	);
	return result.todayChargeOrderCountByState;
}
