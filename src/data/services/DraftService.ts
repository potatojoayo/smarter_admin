import HttpClient from '$data/graphql/client';
import DraftQuery from '$data/graphql/queries/DraftQuery';
import Draft from '$data/classes/Draft';
import CsRequestMutation from '$data/graphql/mutations/CsRequestMutation';
import DraftRequestMutation from '$data/graphql/mutations/DraftRequestMutation';

export default class DraftService {
	static async getDraft(variables: { id: number }) {
		const client = HttpClient.getInstance();
		const result = (await client.request(DraftQuery.Draft, variables)) as {
			draft: {
				id: number;
				categoryName: string;
				subCategoryName: string;
				priceWork: number;
				priceWorkLabor: number;
				printing?: string;
				font?: string;
				threadColor?: string;
				dateCreated: Date;
				memo?: string;
				image: URL;
				sizes: {
					id:number;
					backWidth?: number;
					backHeight?: number;
					leftChestWidth?: number;
					leftChestHeight?: number;
					rightChestWidth?: number;
					rightChestHeight?: number;
					leftShoulderWidth?: number;
					leftShoulderHeight?: number;
					rightShoulderWidth?: number;
					rightShoulderHeight?: number;
					heapWidth?: number;
					heapHeight?: number;
					leftPantMiddleWidth?: number;
					leftPantMiddleHeight?: number;
					rightPantMiddleWidth?: number;
					rightPantMiddleHeight?: number;
					leftPantLowWidth?: number;
					leftPantLowHeight?: number;
					rightPantLowWidth?: number;
					rightPantLowHeight?: number;
					flagWidth?: number;
					flagHeight?: number;
				}[]
			};
		};
		return new Draft(result.draft);
	}

	static async updateDraft(variables: {
		draftId: number;
		file?: File;
		draft: {
			priceWork: number;
			priceWorkLabor: number;
			printing?: string;
			font?: string;
			threadColor?: string;
			memo?: string;
			backWidth?: number;
			backHeight?: number;
			leftChestWidth?: number;
			leftChestHeight?: number;
			rightChestWidth?: number;
			rightChestHeight?: number;
			leftShoulderWidth?: number;
			leftShoulderHeight?: number;
			rightShoulderWidth?: number;
			rightShoulderHeight?: number;
			heapWidth?: number;
			heapHeight?: number;
			leftPantMiddleWidth?: number;
			leftPantMiddleHeight?: number;
			rightPantMiddleWidth?: number;
			rightPantMiddleHeight?: number;
			leftPantLowWidth?: number;
			leftPantLowHeight?: number;
			rightPantLowWidth?: number;
			rightPantLowHeight?: number;
			flagWidth?: number;
			flagHeight?: number;
		};
	}) {
		const client = HttpClient.getInstance();
		const result = (await client.request(
			CsRequestMutation.UpdateNewDraft,
			variables
		)) as {
			updateNewDraft: {
				success: boolean;
			};
		};
		const { success } = result.updateNewDraft;
		return success;
	}

	static async createDraft(variables: {
		userId: number;
		file: File;
		subcategoryName: string;
		draft: {
			priceWork: number;
			priceWorkLabor: number;
			printing?: string;
			font?: string;
			threadColor?: string;
			memo?: string;
			backWidth?: number;
			backHeight?: number;
			leftChestWidth?: number;
			leftChestHeight?: number;
			rightChestWidth?: number;
			rightChestHeight?: number;
			leftShoulderWidth?: number;
			leftShoulderHeight?: number;
			rightShoulderWidth?: number;
			rightShoulderHeight?: number;
			heapWidth?: number;
			heapHeight?: number;
			leftPantMiddleWidth?: number;
			leftPantMiddleHeight?: number;
			rightPantMiddleWidth?: number;
			rightPantMiddleHeight?: number;
			leftPantLowWidth?: number;
			leftPantLowHeight?: number;
			rightPantLowWidth?: number;
			rightPantLowHeight?: number;
			flagWidth?: number;
			flagHeight?: number;
		};
	}) {
		const client = HttpClient.getInstance();
		const result = (await client.request(
			CsRequestMutation.CreateNewDraft,
			variables
		)) as {
			createNewDraft: {
				success: boolean;
			};
		};
		const { success } = result.createNewDraft;
		return success;
	}

	static async finishDraftRequest(variables: {
		draftRequestId: number;
	}) {
		const client = HttpClient.getInstance();
		const result = await client.request(
			DraftRequestMutation.FinishDraftRequest,
			variables
		);
		return {
			success: result.finishDraftRequest.success,
			message: result.finishDraftRequest.message
		};
	}
}
