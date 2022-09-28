import { useMutation } from '@apollo/client';

import { CREATE_REVIEW } from '../graphql/queries';

const useReview = () => {
	const [mutate, result] = useMutation(CREATE_REVIEW);

	const review = async ({ ownerName, repositoryName, rating, text }) => {
		const {data} = await mutate({ variables: { ownerName, repositoryName, rating, text } });
		const reviewObject = data.createReview
		return reviewObject
	};
  
	return [review, result];
};

export default useReview;