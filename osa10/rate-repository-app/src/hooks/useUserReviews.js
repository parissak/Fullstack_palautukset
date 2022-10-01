import { useQuery } from '@apollo/client';

import { GET_CURRENT_USER_REVIEWS } from '../graphql/queries';

const useRepository = () => {
	const { data, loading} = useQuery(GET_CURRENT_USER_REVIEWS);
	
	return { data, loading };
};


export default useRepository;