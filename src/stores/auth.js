import { AuthService } from '../data/services/auth';
import HttpClient from '../data/providers/http_client';
import authClient from '../data/providers/auth_client';
import { writable } from 'svelte/store';
import { goto } from '$app/navigation';

export const user = writable();
export const fcmToken = writable();

export async function login(
	identification,
	password
) {
	const result = await authClient.request(
		AuthService.getToken,
		{
			identification,
			password
		}
	);
	const data = result.tokenAuth;
	console.log(data);
	user.set(data.user);
	return data.user;
}

export async function tokenRefresh() {
	const httpClient = HttpClient.getInstance();
	return await httpClient.request(
		AuthService.refreshToken
	);
}

export async function getMe(token) {
	try {
		let result = await authClient.request(
			AuthService.me,
			{ token }
		);
		user.set(result.me);
		return result.me;
	} catch (e) {}
}

export async function logout() {
	await fetch(
		import.meta.env.VITE_GRAPHQL_ENDPOINT.replaceAll(
			'graphql',
			''
		) + 'authentication/logout'
	);
	goto('/login');
}
