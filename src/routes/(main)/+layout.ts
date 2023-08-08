import authClient from '$data/providers/auth_client';
import { AuthService } from '$data/services/auth';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async () => {
	const result = await authClient.request(
		AuthService.me
	);
	const me = result.me;
	return { me };
};
