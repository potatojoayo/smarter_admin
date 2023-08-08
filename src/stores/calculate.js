import HttpClient from '../data/providers/http_client';
import { isLoading } from './global_setting.js';
import CalculateService from '../data/services/calculate.ts';

const http = HttpClient.getInstance();

export async function completeSubcontractorCalculation(
	calculationIds
) {
	const result = await http.request(
		CalculateService.CompleteSubcontractorCalculation,
		{ calculationIds }
	);
	return result.completeSubcontractorCalculation
		.success;
}

export async function completeAgencyCalculation(
	calculationIds
) {
	const result = await http.request(
		CalculateService.CompleteAgencyCalculation,
		{
			calculationIds
		}
	);
	return result.completeAgencyCalculation.success;
}

export async function getAgencyCalculations(
	year,
	month,
	period,
	agency,
	page,
	first
) {
	if (!first) {
		first = 20;
	}
	let [dateFrom, dateTo] = _getPeriod(
		year,
		month,
		period
	);
	let offset = 0;
	if (page) {
		offset = (page - 1) * 20;
	}
	if (agency === '전체') {
		agency = null;
	}
	isLoading.set(true);
	const result = await http.request(
		CalculateService.AgencyCalculation,
		{
			dateFrom,
			dateTo,
			agency,
			offset,
			first
		}
	);
	const calculations = result.agencyCalculation;
	isLoading.set(false);
	return {
		totalCount: calculations.totalCount,
		totalSell: calculations.totalSell,
		totalProfit: calculations.totalProfit,
		totalPricePlatform:
			calculations.totalPricePlatform,
		totalNetProfit: calculations.totalNetProfit,
		calculations: calculations.edges.map(
			(e) => e.node
		)
	};
}

export async function getSubcontractorCalculations(
	year,
	month,
	period,
	subcontractor,
	page,
	first
) {
	if (!first) {
		first = 20;
	}
	let [dateFrom, dateTo] = _getPeriod(
		year,
		month,
		period
	);
	let offset = 0;
	if (page) {
		offset = (page - 1) * 20;
	}
	if (subcontractor === '전체') {
		subcontractor = null;
	}
	isLoading.set(true);
	const result = await http.request(
		CalculateService.SubcontractorCalculation,
		{
			dateFrom,
			dateTo,
			subcontractor,
			offset,
			first
		}
	);
	const calculations =
		result.subcontractorCalculation;

	isLoading.set(false);

	return {
		totalCount: calculations.totalCount,
		totalPriceWork: calculations.totalPriceWork,
		totalWorkAmount: calculations.totalWorkAmount,
		totalPriceWorkLabor:
			calculations.totalPriceWorkLabor,
		calculations: calculations.edges.map(
			(e) => e.node
		)
	};
}

function _getPeriod(year, month, period) {
	let dateFrom = new Date(
		year,
		month - 1,
		0,
		0,
		0,
		0
	);
	let dateTo = new Date(
		year,
		month,
		1,
		0,
		0,
		0,
		0
	);
	if (period === '월초') {
		dateTo = new Date(
			year,
			month - 1,
			16,
			0,
			0,
			0,
			0
		);
	} else if (period === '월말') {
		dateFrom = new Date(
			year,
			month - 1,
			15,
			0,
			0
		);
	}

	dateFrom = new Date(
		dateFrom.getTime() -
			dateFrom.getTimezoneOffset() * 60000
	).toISOString();

	dateTo = new Date(
		dateTo.getTime() -
			dateTo.getTimezoneOffset() * 60000
	).toISOString();

	return [dateFrom, dateTo];
}
