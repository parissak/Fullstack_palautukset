import { useParams  } from 'react-router-native';
import { Text, View } from 'react-native';

import RepositoryItem from './RepositoryItem';
import useRepository from '../hooks/useRepository';

const RepositoryItemWithURL = () => {
	const { repositoryId, } = useParams();
	const { data, fetchMore, loading } = useRepository({repositoryId, first: 2});
 
	const onEndReach = () => {
		fetchMore();
	};

	return (
		<View>
			{loading && <View><Text>Loading</Text></View>}
			{!loading && <RepositoryItem item={data.repository} showSingleRepo={true} onEndReach={onEndReach}/>}
		</View>
	)
}

export default RepositoryItemWithURL;