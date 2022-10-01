import { StyleSheet, View } from 'react-native';
import { useNavigate  } from 'react-router-native';
import theme from '../theme';

import Button from './Button';
import Text from './Text';

const styles = StyleSheet.create({
	buttonContainer: {
		flexDirection: 'row', 
		justifyContent: 'space-evenly',
		marginBottom: 15
	},
	circle: {
		borderColor: theme.colors.blue,
		borderRadius: 50/2,
		borderStyle: 'solid',
		borderWidth: 2,
		height: 50,
		justifyContent: 'center',
		width: 50,
	},
	upperContainer: {
		display: 'flex',
		flexDirection: 'row'
	},
	descriptionContainer: {
		alignItems: 'flex-start',
		display: 'flex',
		flexDirection: 'column',
		flexShrink: 1,
		justifyContent: 'center',
		marginBottom: 15,
		marginLeft: 15,
	}
});


const ReviewItem = ({ review, showUserReviews, deleteReview }) => {
	const navigate = useNavigate(); 
	const splittedDateString = review.createdAt.split(/[-T]/)
	const dateString = splittedDateString[2] + "." + splittedDateString[1] + "." + splittedDateString[0]

	const handleDeleteReview = (reviewId) => {
		deleteReview(reviewId)
	}

	const handleOpenRepository = (repositoryId) => {
		navigate(`/${repositoryId}`);
	}

	return(
		<View style={{marginTop: 15}}>
			<View style={styles.upperContainer}> 
				<View style={styles.circle}>
					<Text fontWeight='bold' style={{color: theme.colors.blue, textAlign: 'center'}}>{review.rating}</Text>
				</View>
				<View style={styles.descriptionContainer}>
					{!showUserReviews && <Text fontWeight='bold' style={{paddingBottom: 7.5}}>{review.user.username}</Text>}
					{showUserReviews && <Text fontWeight='bold' style={{paddingBottom: 7.5}}>{review.repositoryId}</Text>}
					<Text style={{paddingBottom: 7.5}}>{dateString}</Text>
					<Text style={{width: 250}}>{review.text}</Text>
				</View>

			</View>
			{showUserReviews && 
				<View style={styles.buttonContainer}>
					<Button text={'View Repository'} applyFlex applyRightGap onPress={() => handleOpenRepository(review.repositoryId)} />
					<Button text={'Delete Review'} isRed applyFlex onPress={() => handleDeleteReview(review.id)} />
				</View> 
			}
		</View>
	)
}

export default ReviewItem;