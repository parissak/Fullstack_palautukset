import {Picker} from '@react-native-picker/picker';
import { useState } from 'react';

import RepositoryListContainer from './RepositoryListContainer';
import theme from '../theme';
import useRepositories from '../hooks/useRepositories';


const RepositoryList = () => {
	const [selectedSorting, setSelectedSorting] = useState();
	const { repositories } = useRepositories(selectedSorting);

	return (
		<>
			<RepositorySorter selectedSorting={selectedSorting} setSelectedSorting={setSelectedSorting}/>
			<RepositoryListContainer repositories={repositories} /> 
		</>
	);
};

const RepositorySorter = ({selectedSorting, setSelectedSorting}) => {
	return(
		<Picker
			selectedValue={selectedSorting}
			style={{backgroundColor: theme.colors.grey, padding: 20}}
			onValueChange={(itemValue) => setSelectedSorting(itemValue)}>
			<Picker.Item label="Latest repositories" value="latest" />
			<Picker.Item label="Highest rated repositories" value="highest" />
			<Picker.Item label="Lowest rated repositories" value="lowest" />
		</Picker>
	)
}

export default RepositoryList;