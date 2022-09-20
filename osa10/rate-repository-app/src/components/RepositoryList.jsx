import { FlatList, View, StyleSheet } from 'react-native';

import RepositoryItem from './RepositoryItem'
import theme from '../theme';

import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
	separator: {
		height: 10,
		backgroundColor: theme.colors.grey
	},
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
	const { repositories } = useRepositories();

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
};

export default RepositoryList;