import GymMutation from '$data/graphql/mutations/GymMutation';
import HttpClient from '$data/providers/http_client';

export default class GymService {
	static async updateGymMemo(variables: {
		gymId: number;
		memo: string;
	}) {
		const client = HttpClient.getInstance();
		const {
			updateGymMemo: { success, message }
		} = (await client.request(
			GymMutation.UpdateGymMemo,
			variables
		)) as {
			updateGymMemo: {
				success: boolean;
				message: string;
			};
		};
		return {
			success,
			message
		};
	}
}
