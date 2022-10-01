import { useQuery } from '@apollo/client';

import { GET_CURRENT_USER_REVIEWS } from '../graphql/queries';

const useRepository = () => {
	const { data, loading, refetch } = useQuery(GET_CURRENT_USER_REVIEWS);
	
	return { data, loading, refetch };
};


export default useRepository;