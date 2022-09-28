import { useMutation } from '@apollo/client';

import { CREATE_USER } from '../graphql/queries';

const useSignUp = () => {
	const [mutate, result] = useMutation(CREATE_USER);

	const signUp = async ({ username, password }) => {
		await mutate({ variables: { username: username, password: password } });
	};
  
	return [signUp, result];
};

export default useSignUp;