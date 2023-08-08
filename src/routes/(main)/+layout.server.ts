import { redirect } from '@sveltejs/kit';
import authClient from '../../data/providers/auth_client';
import { AuthService } from '../../data/services/auth';
import { gql } from 'graphql-request';
import HttpClient from '../../data/providers/http_client';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({
	cookies
}) => {
	const httpClient = HttpClient.getInstance();
	const token = cookies.get('JWT');
	console.log(token);
	if (!token) {
		throw redirect(302, '/login');
	}
	try {
		const IsAdmin = gql`
			query IsAdmin($token: String) {
				isAdmin(token: $token)
			}
		`;
		const { isAdmin } = await httpClient.request(
			IsAdmin,
			{
				token
			}
		);

		if (!isAdmin) {
			redirect(302, '/login');
		}
		return {
			token
		};
	} catch (_) {
		try {
			const refreshToken = cookies.get(
				'JWT-refresh-token'
			);
			await authClient.request(
				AuthService.refreshToken,
				{ refreshToken: refreshToken }
			);
			return {
				token
			};
		} catch (e) {
			const error = JSON.parse(
				JSON.stringify(e, undefined, 2)
			);
			if (!error.response) {
				throw redirect(302, '/login');
			}
			const message =
				error.response.errors[0].message;
			if (
				message.includes(
					'Refresh token is expired'
				) ||
				message.includes('Invalid refresh token')
			) {
				throw redirect(302, '/login');
			}
			return {
				token
			};
		}
	}
};
