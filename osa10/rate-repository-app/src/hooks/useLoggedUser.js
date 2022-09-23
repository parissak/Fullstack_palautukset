import { GET_CURRENT_USER } from '../graphql/queries';
import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

const useLoggedUser = () => {
	const { data, loading } = useQuery(GET_CURRENT_USER)
	const [logged, setLogged] = useState(null);
	
	useEffect(() => {
		if (loading === false && data) {
			setLogged(data.me);
		}  
	}, [data]);

	return logged;
};

export default useLoggedUser;