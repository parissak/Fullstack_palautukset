import { Image, Linking, Pressable, StyleSheet, View } from 'react-native';
import theme from '../theme';

import Text from './Text';

const styles = StyleSheet.create({
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
		flexShrink: 1
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

const RepositoryItem = ({ item, showUrl }) => {
	const roundNumber = (number) => {
		return number >= 1000 ? (number/1000).toFixed(1) + 'k' : number
	}

	const openURL = (url) => {
		Linking.openURL(url)
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
			{showUrl &&
				<Pressable style={styles.buttonField} onPress={() => openURL(item.url)}>
					<Text style={{color: theme.colors.textSecondary}}>Open in Github </Text>
				</Pressable>
			}
		</View>
 
	)
};

export default RepositoryItem;