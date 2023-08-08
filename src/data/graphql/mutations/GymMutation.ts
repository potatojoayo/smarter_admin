import { gql } from 'graphql-request';

export default class GymMutation {
	static UpdateGymMemo = gql`
		mutation UpdateGymMemo(
			$gymId: Int!
			$memo: String!
		) {
			updateGymMemo(gymId: $gymId, memo: $memo) {
				success
				message
			}
		}
	`;
}
