import { gql } from 'graphql-request';

export class AuthService {
	static me = gql`
		query Me($token: String) {
			me(token: $token) {
				id
				identification
				name
				isAdmin
				group
				agency {
					id
					name
				}
				subcontractor {
					name
					isPreWorking
				}
			}
		}
	`;
	static getToken = gql`
		mutation Login(
			$identification: String!
			$password: String!
			$fcmToken: String
		) {
			tokenAuth(
				identification: $identification
				password: $password
				fcmToken: $fcmToken
			) {
				token
				refreshToken
				user {
					id
					identification
					name
					isAdmin
					group
					subcontractor {
						name
					}
				}
			}
		}
	`;

	static verifyToken = gql`
		mutation VerifyToken($token: String!) {
			verifyToken(token: $token) {
				payload
			}
			checkIsAdmin {
				success
			}
		}
	`;

	static refreshToken = gql`
		mutation RefreshToken(
			$refreshToken: String!
		) {
			refreshToken(refreshToken: $refreshToken) {
				__typename
				token
				refreshToken
			}
		}
	`;
}
