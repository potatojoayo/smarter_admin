import { gql } from 'graphql-request';

export default class DraftRequestMutation {
	static FinishDraftRequest = gql`
		mutation FinishDraftRequest(
			$draftRequestId: Int
		) {
			finishDraftRequest(
				draftRequestId: $draftRequestId
			) {
				success
				message
			}
		}
	`;
}
