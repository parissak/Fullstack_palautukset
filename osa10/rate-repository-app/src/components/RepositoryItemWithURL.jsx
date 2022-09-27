import { useParams  } from 'react-router-native';
import { Text, View } from 'react-native';

import RepositoryItem from './RepositoryItem';
import useRepository from '../hooks/useRepository';

const RepositoryItemWithURL = () => {
	let { repositoryId } = useParams();
	const { data, loading } = useRepository(repositoryId);
 
	return (
		<View>
			{loading && <View><Text>Loading</Text></View>}
			{!loading && <RepositoryItem item={data.repository} showSingleRepo={true} />}
		</View>
	)
}

export default RepositoryItemWithURL;