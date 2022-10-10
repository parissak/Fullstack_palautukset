import RepositoryItem from './RepositoryItem'
import theme from '../theme';

import { FlatList, Pressable, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
	separator: {
		height: 10,
		backgroundColor: theme.colors.grey
	},
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListContainer = ({repositories, onEndReach, showSingleItem}) => {

	const repositoryNodes = repositories
		? repositories.edges.map(edge => edge.node)
		: [];

	return (
		<FlatList
			data={repositoryNodes}
			ItemSeparatorComponent={ItemSeparator}
			keyExtractor={(item) => item.id}
			onEndReached={onEndReach}
			onEndReachedThreshold={0.5}
			renderItem={({item}) => (
				<Pressable style={{marginRight: 20}} onPress={() => showSingleItem(item)}>
					<RepositoryItem item={item} showSingleRepo={false} />
				</Pressable>)}
		/>
	);
}


export default RepositoryListContainer;