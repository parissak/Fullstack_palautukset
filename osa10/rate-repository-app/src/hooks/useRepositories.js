import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (selectedSorting) => {
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

	const { data, error, loading } = useQuery(GET_REPOSITORIES, {
		variables: {'orderBy' : sortingMethod, 'orderDirection' : orderDirection}, 
		fetchPolicy: 'cache-and-network'
	})
	
	const [repositories, setRepositories] = useState();

	const fetchRepositories = async () => {
		setRepositories(data.repositories);
	};

	useEffect(() => {
		if (data) {
			fetchRepositories();
		}
	}, [data]);

	return { repositories, loading, refetch: fetchRepositories };
};

export default useRepositories;