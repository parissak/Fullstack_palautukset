import { GET_REPOSITORY_BY_ID } from '../graphql/queries';

import { useQuery } from '@apollo/client';

const useRepository = (variables) => {
	const { data, fetchMore, loading, ...result } = useQuery(GET_REPOSITORY_BY_ID, {variables: variables, fetchPolicy: 'cache-and-network'});
	
	const handleFetchMore = () => {
		const canFetchMore = !loading && data && data.repository.reviews.pageInfo.hasNextPage;
	
		if (!canFetchMore) {
			return;
		}
	
		fetchMore({
			variables: {
				after: data.repository.reviews.pageInfo.endCursor,
				...variables
			},
		});
	};

	return { data, fetchMore: handleFetchMore, loading, ...result };
};


export default useRepository;