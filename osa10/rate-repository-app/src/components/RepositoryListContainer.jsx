import RepositoryItem from './RepositoryItem'
import theme from '../theme';

import { FlatList, } from 'react-native';

import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	separator: {
		height: 10,
		backgroundColor: theme.colors.grey
	},
});


const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListContainer = ({repositories}) => {
	const repositoryNodes = repositories
		? repositories.edges.map(edge => edge.node)
		: [];

	return (
		<FlatList
			data={repositoryNodes}
			ItemSeparatorComponent={ItemSeparator}
			keyExtractor={(item) => item.fullName}
			renderItem={({item}) => (<RepositoryItem item = {item} />)}
		/>
	);
}


export default RepositoryListContainer;