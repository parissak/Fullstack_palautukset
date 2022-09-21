import { useMutation } from '@apollo/client';

import { LOGIN } from '../graphql/queries';

const useSignIn = () => {
	const [mutate, result] = useMutation(LOGIN);

	const signIn = async ({ username, password }) => {
		const credentials = { username, password };
		const res =  await mutate({ variables: { credentials } });
		return res
	};
  
	return [signIn, result];
};

export default useSignIn;