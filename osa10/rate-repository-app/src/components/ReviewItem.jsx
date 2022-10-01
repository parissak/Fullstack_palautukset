import { StyleSheet, View } from 'react-native';
import theme from '../theme';

import Text from './Text';

const styles = StyleSheet.create({
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

const ReviewItem = ({ review, showUserReviews }) => {
	console.log("u", showUserReviews)
	const splittedDateString = review.createdAt.split(/[-T]/)
	const dateString = splittedDateString[2] + "." + splittedDateString[1] + "." + splittedDateString[0]

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
		</View>
	)
}

export default ReviewItem;