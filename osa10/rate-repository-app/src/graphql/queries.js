import { gql } from '@apollo/client';

const REPOSITORY_DETAILS = gql`
	fragment RepositoryDetails on Repository {
		id
		fullName
		reviewCount
		stargazersCount
		forksCount
		ownerAvatarUrl
		description
		language
		ratingAverage
	}
`;

export const GET_REPOSITORIES = gql`
	query {
		repositories {
			edges {
				node {
					...RepositoryDetails
				}
			}
		}
	}
	${REPOSITORY_DETAILS}
`;

export const LOGIN = gql`
	mutation authenticate($credentials: AuthenticateInput!) {
		authenticate(credentials: $credentials) {
			accessToken
		}
  	}
`;

export const GET_CURRENT_USER = gql`
	query {
		me {
			id
			username
		}
	}
`;

export const GET_REPOSITORY_BY_ID = gql`
	query ($repositoryId: ID!) {
		repository(id: $repositoryId) {
			...RepositoryDetails
			url
			reviews {
				edges {
				  	node {
						id
						text
						rating
						createdAt
						user {
					  		id
					  		username
						}
				 	}
				}
			}
		}
	}
	${REPOSITORY_DETAILS}
`;

