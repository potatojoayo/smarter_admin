import HttpClient from '../data/providers/http_client';
import WorkService from '../data/services/work';
import { isLoading } from './global_setting.js';

const http = HttpClient.getInstance();

export async function updateWorkMemos(
	workId,
	memoBySubcontractor,
	memoByPreWorker,
	memoByAdmin
) {
	const result = await http.request(
		WorkService.UpdateWorkMemos,
		{
			workId,
			memoBySubcontractor,
			memoByAdmin,
			memoByPreWorker
		}
	);
	return result.updateWorkMemos.success;
}

export async function completeWorks(workIds) {
	const result = await http.request(
		WorkService.CompleteWorks,
		{
			workIds
		}
	);
	return result.completeWorks.success;
}

export async function completePreWorks(
	workIds,
	subcontractorId
) {
	const result = await http.request(
		WorkService.CompletePreWorks,
		{ workIds, subcontractorId }
	);
	return result.completePreWorks.success;
}

export async function getWork(id) {
	const result = await http.request(
		WorkService.Work,
		{
			id
		}
	);
	return {
		work: result.work,
		subcontractors: result.subcontractors
	};
}

export async function getWorks({
	page = null,
	dateFrom = null,
	dateTo = null,
	subcontractor = null,
	states = [],
	isOutWorking = null,
	state = null,
	keyword = null,
	ids = null
}) {
	isLoading.set(true);
	if (state === '전체') {
		state = null;
	}
	if (subcontractor === '전체')
		subcontractor = '';
	let offset = page ? (page - 1) * 20 : null;
	isLoading.set(true);
	const result = await http.request(
		WorkService.Works,
		{
			offset,
			dateFrom,
			dateTo,
			subcontractor,
			states,
			isOutWorking,
			state,
			keyword
		}
	);
	isLoading.set(false);
	return {
		works: result.works.edges.map((e) => e.node),
		totalCount: result.works.totalCount,
		subcontractors: result.subcontractors
	};
}

export async function getWorksForPrint({
	ids = null
}) {
	const result = await http.request(
		WorkService.WorksForPrint,
		{
			ids
		}
	);
	return {
		works: result.works.edges.map((e) => e.node)
	};
}

export async function assignWork(
	orderDetailIds,
	subcontractorId,
	memo
) {
	const result = await http.request(
		WorkService.AssignWork,
		{
			orderDetailIds,
			subcontractorId,
			memo
		}
	);
	if (result.assignWork.notApplicable) {
		alert('이동불가 상품이 포함되어 있습니다.');
		return false;
	}
	return result.assignWork.success;
}

export async function updateMemo(work) {
	const result = await http.request(
		WorkService.UpdateMemo,
		{
			workId: work.workId,
			memo: work.memo
		}
	);

	return result.updateWork.success;
}
