import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
	query Query {
		repositories {
		edges {
			node {
			fullName
			reviewCount
			stargazersCount
			forksCount
			ownerAvatarUrl
			description
			language
			ratingAverage
			}
		}
		}
	}
`;

export const LOGIN = gql`
	mutation authenticate($credentials: AuthenticateInput!) {
		authenticate(credentials: $credentials) {
			accessToken
		}
  	}
`;