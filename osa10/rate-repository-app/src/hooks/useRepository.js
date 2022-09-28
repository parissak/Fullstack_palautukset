import { GET_REPOSITORY_BY_ID } from '../graphql/queries';

import { useQuery } from '@apollo/client';

const useRepository = (repositoryId) => {
	const { data, loading } = useQuery(GET_REPOSITORY_BY_ID, {variables: {repositoryId}, fetchPolicy: 'cache-and-network'});
	return { data, loading };
};

export default useRepository;