import { FlatList, View } from 'react-native';

import ReviewItem from './ReviewItem';
import Text from './Text';
import theme from '../theme';
import useUserReviews from '../hooks/useUserReviews';

const UserReviews = () => {
	const { data, loading} = useUserReviews();
	const reviewNodes = data ? data.me.reviews.edges.map(edge => edge.node) : []

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
							renderItem={({ item }) => <ReviewItem review={item} showUserReviews={true} />}
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