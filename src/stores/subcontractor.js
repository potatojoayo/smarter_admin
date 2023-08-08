import { writable } from 'svelte/store';
import WorkService from '../data/services/work';
import HttpClient from '../data/providers/http_client';

export const selectedSubcontractor = writable();

const http = HttpClient.getInstance();

export async function getSubcontractors(
	isOutWorking,
	isPreWorking
) {
	const result = await http.request(
		WorkService.Subcontractors,
		{ isPreWorking, isOutWorking }
	);
	return result.subcontractors;
}
