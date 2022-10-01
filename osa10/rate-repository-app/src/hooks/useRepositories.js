import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ({selectedSorting, searchKeyword, first}) => {

	let sortingMethod, orderDirection = ""
	switch(selectedSorting) {
	case('latest'):
		sortingMethod = 'CREATED_AT';
		orderDirection = 'DESC'
		break;
	case('highest'):
		sortingMethod = 'RATING_AVERAGE'
		orderDirection = 'DESC'
		break;
	case('lowest'):
		sortingMethod = 'RATING_AVERAGE'
		orderDirection = 'ASC'
		break;
	default:
		sortingMethod = 'CREATED_AT';
		orderDirection = 'DESC'
	}

	const variables = {'orderBy' : sortingMethod, 'orderDirection' : orderDirection, 'searchKeyword' : searchKeyword, 'first': first }

	const { data, fetchMore, loading, ...result } = useQuery(GET_REPOSITORIES, {
		variables: variables, 
		fetchPolicy: 'cache-and-network'
	})
	
	const handleFetchMore = () => {
		const canFetchMore = !loading && data.repositories.pageInfo.hasNextPage;

		if (!canFetchMore) {
			return;
		}

		fetchMore({
			variables: {
				after: data.repositories.pageInfo.endCursor,
				...variables,
			},
		});

	};

	return { repositories: data ? data.repositories : undefined, fetchMore: handleFetchMore, loading, ...result };
};

export default useRepositories;