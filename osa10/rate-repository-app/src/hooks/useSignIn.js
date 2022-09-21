import { useApolloClient, useMutation } from '@apollo/client';

import useAuthStorage from '../hooks/useAuthStorage';
import { LOGIN } from '../graphql/queries';

const useSignIn = () => {
	const [mutate, result] = useMutation(LOGIN);
	const authStorage = useAuthStorage();
	const apolloClient = useApolloClient();

	const signIn = async ({ username, password }) => {
		const credentials = { username, password };

		const { data } = await mutate({ variables: { credentials } });
		await authStorage.setAccessToken(data.authenticate.accessToken);
		apolloClient.resetStore();
	};
  
	return [signIn, result];
};

export default useSignIn;