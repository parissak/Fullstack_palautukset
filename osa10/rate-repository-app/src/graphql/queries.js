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
	query ($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String, $after: String, $first: Int) {
		repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword, after: $after, first: $first) {
			edges {
				node {
					...RepositoryDetails
				}
				cursor
			}
			pageInfo {
				endCursor
				startCursor
				hasNextPage
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
	query ($repositoryId: ID!, $after: String, $first: Int) {
		repository(id: $repositoryId) {
			...RepositoryDetails
			url
			reviews (after: $after, first: $first) {
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
					cursor
				}
				pageInfo {
					endCursor
					startCursor
					hasNextPage
				}
			}
		}
	}
	${REPOSITORY_DETAILS}
`;

export const GET_CURRENT_USER_REVIEWS = gql`
	query {
		me {
			reviews {
				edges {
					node {
						repositoryId
						rating
						createdAt
						text
					}
				}
			}
		}
	}
`;

export const CREATE_REVIEW = gql`
	mutation Mutation ($repositoryName: String!, $ownerName: String!, $rating: Int!, $text: String!) {
		createReview (review: {repositoryName: $repositoryName, ownerName:$ownerName, rating: $rating, text:$text}) {
			text
			createdAt
			rating
			repository {
				name
				ownerName
			}
			id
			repositoryId
		}
	}
`;

export const CREATE_USER = gql`
	mutation Mutation  ($username: String!, $password: String!)  {
		createUser  (user: {username: $username,  password: $password}) {
			username
			id
			createdAt
		}
  	}
`; 