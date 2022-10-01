import { FlatList, Image, Linking, Pressable, StyleSheet, View } from 'react-native';

import Button from './Button';
import ReviewItem from './ReviewItem';
import Text from './Text';
import theme from '../theme';


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
	logo: {
		width: 50,
		height: 50,
		borderRadius: 50 / 10
	},
	descriptionContainer: {
		alignItems: 'flex-start',
		display: 'flex',
		flexDirection: 'column',
		flexShrink: 1,
		justifyContent: 'center',
		marginBottom: 15,
		marginLeft: 15,
	},
	statsContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginBottom: 15
	},
	tag: {
		borderRadius: 5,
		backgroundColor: theme.colors.blue, 
		color: theme.colors.textSecondary,
		padding: 4
	},
	columnContainer: {
		display: 'flex',
		flexDirection: 'column'
	},
	buttonField: {
		alignItems: 'center',
		backgroundColor: theme.colors.blue,
		borderRadius: 5,
		justifyContent: 'center',
		padding: 15
	},
});

const RepositoryItem = ({ item, showSingleRepo, onEndReach }) => {
	const roundNumber = (number) => {
		return number >= 1000 ? (number/1000).toFixed(1) + 'k' : number
	}

	return (
		<View testID="repositoryItem" style={{margin: 15}}>
			<View style={styles.upperContainer}> 
				<Image style={styles.logo} source={{ uri: item.ownerAvatarUrl }}></Image>
				<View style={styles.descriptionContainer}> 
					<Text fontWeight='bold' style={{paddingBottom: 7.5}}>{item.fullName}</Text>
					<Text style={{paddingBottom: 7.5}}>{item.description}</Text>
					<Text style={styles.tag}>{item.language}</Text>
				</View>
			</View>
			<View style={styles.statsContainer}> 
				<View style={styles.columnContainer} >
					<Text fontWeight='bold' style={{textAlign: 'center'}}>{roundNumber(item.stargazersCount)}</Text>
					<Text style={{textAlign: 'center'}}>Stars</Text>
				</View>
				<View style={styles.columnContainer}>
					<Text fontWeight='bold' style={{textAlign: 'center'}}>{roundNumber(item.forksCount)}</Text>
					<Text style={{textAlign: 'center'}}>Forks</Text>
				</View>
				<View style={styles.columnContainer}>
					<Text fontWeight='bold' style={{textAlign: 'center'}}>{roundNumber(item.reviewCount)} </Text>
					<Text style={{textAlign: 'center'}}>Reviews</Text>
				</View>
				<View style={styles.columnContainer}>
					<Text fontWeight='bold' style={{textAlign: 'center'}}>{roundNumber(item.ratingAverage)} </Text>
					<Text style={{textAlign: 'center'}}>Rating</Text>
				</View>
			</View>
			{showSingleRepo && <SingleRepository item={item} onEndReach={onEndReach}/>}
		</View>
	)
};

const ItemSeparator = () => <View style={{height: 10, backgroundColor: theme.colors.grey}} />;

const SingleRepository = ({item, onEndReach}) => {
	const reviewNodes = item.reviews.edges.map(edge => edge.node)

	const openURL = (url) => {
		Linking.openURL(url)
	}

	return (
		<View>
			<View style={{marginBottom: 15}}>
				<Button text={'Open in Github'} onPress={() => openURL(item.url)} />
			</View>
			<FlatList 
				data={reviewNodes} 
				ItemSeparatorComponent={ItemSeparator}
				renderItem={({ item }) => <ReviewItem review={item} showUserReviews={false}/>}
				onEndReached={onEndReach}
				onEndReachedThreshold={0.5}
			/>
		</View>
	)
}

export default RepositoryItem;