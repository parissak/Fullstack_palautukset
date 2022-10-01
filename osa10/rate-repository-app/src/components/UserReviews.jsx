import { Alert, FlatList, View } from 'react-native';

import ReviewItem from './ReviewItem';
import Text from './Text';
import theme from '../theme';
import useUserReviews from '../hooks/useUserReviews';
import useDeleteReview from '../hooks/useDeleteReview';


const UserReviews = () => {
	const { data, loading, refetch } = useUserReviews();
	const [deleteReview] = useDeleteReview();
	const reviewNodes = data ? data.me.reviews.edges.map(edge => edge.node) : []

	const handleDeleteReview = (reviewId) => {
		Alert.alert("Delete review", "Are you sure you want to delete this review?",[
			{ text: "Cancel", onPress: () => false },
			{ text: "OK", onPress: () => confirmedDeletion() }
		]);
	
		const confirmedDeletion = async () => {
			try {
				await deleteReview({reviewId});	
				refetch()
			} catch (e) {
				console.log("error", e);
			}
		}
	}

	return (
		<View> 
			{loading && <Text>loading</Text>}

			{!loading &&
			<View style={{marginRight: 20}}> 
				<View testID="repositoryItem" style={{margin: 15}}>		
					<View>
						<FlatList 
							data={reviewNodes} 
							ItemSeparatorComponent={ItemSeparator}
							keyExtractor={(item) => item.repositoryId}
							renderItem={({ item }) => <ReviewItem review={item} showUserReviews={true} deleteReview={handleDeleteReview}/>}
						/>
					</View>
				</View>
			</View>
			}
		</View>
	);
};

const ItemSeparator = () => <View style={{height: 10, backgroundColor: theme.colors.grey}} />;

export default UserReviews