import { useState, useEffect } from 'react';

import { GET_REPOSITORIES } from '../graphql/queries';

import { useQuery } from '@apollo/client';

const useRepositories = () => {
	const { data, error, loading } = useQuery(GET_REPOSITORIES, {fetchPolicy: 'cache-and-network'})
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