import { useMutation } from '@apollo/client';

import { DELETE_REVIEW } from '../graphql/queries';

const useReview = () => {
	const [mutate, result] = useMutation(DELETE_REVIEW);

	const deleteReview = ({ reviewId }) => {
		const response = mutate({ variables: {deleteReviewId : reviewId} });
		return response
	};
  
	return [deleteReview, result];
};

export default useReview;