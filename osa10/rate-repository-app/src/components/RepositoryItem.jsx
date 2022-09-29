import { FlatList, Image, Linking, Pressable, StyleSheet, View } from 'react-native';
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
		textAlign: 'center',
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
		display: 'flex',
		flexDirection: 'column',
		marginLeft: 15,
		marginBottom: 15,
		alignItems: 'flex-start',
		justifyContent: 'center',
		flexShrink: 1,
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

const RepositoryItem = ({ item, showSingleRepo }) => {
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
			{showSingleRepo && <SingleRepository item={item} />}
		</View>
	)
};

const ItemSeparator = () => <View style={{height: 10, backgroundColor: theme.colors.grey}} />;

const SingleRepository = ({item}) => {
	const reviewNodes = item.reviews.edges.map(edge => edge.node)

	const openURL = (url) => {
		Linking.openURL(url)
	}

	return (
		<View>
			<View style={{marginBottom: 15}}>
				<Pressable style={styles.buttonField} onPress={() => openURL(item.url)}>
					<Text style={{color: theme.colors.textSecondary}}>Open in Github </Text>
				</Pressable>
			</View>
			<FlatList 
				data={reviewNodes} 
				renderItem={({ item }) => <ReviewItem review={item} />}
				ItemSeparatorComponent={ItemSeparator}
			/>
		</View>
	)
}

const ReviewItem = ({review}) => {
	const splittedDateString = review.createdAt.split(/[-T]/)
	const dateString = splittedDateString[2] + "." + splittedDateString[1] + "." + splittedDateString[0]

	return(
		<View style={{marginTop: 15}}>
			<View style={styles.upperContainer}> 
				<View style={styles.circle}>
					<Text fontWeight='bold' style={{color: theme.colors.blue}}>{review.rating}</Text>
				</View>
				<View style={styles.descriptionContainer}>
					<Text fontWeight='bold' style={{paddingBottom: 7.5}}>{review.user.username}</Text>
					<Text style={{paddingBottom: 7.5}}>{dateString}</Text>
					<Text>{review.text}</Text>
				</View>
			</View>
		</View>
	)
}

export default RepositoryItem;