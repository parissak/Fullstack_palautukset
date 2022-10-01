import { useMutation } from '@apollo/client';

import { DELETE_REVIEW } from '../graphql/queries';

const useReview = () => {
	const [mutate, result] = useMutation(DELETE_REVIEW);

	const review =  ({ reviewId }) => {
		mutate({ variables: {deleteReviewId : reviewId} });
	};
  
	return [review, result];
};

export default useReview;