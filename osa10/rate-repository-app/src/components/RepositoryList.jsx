import {Picker} from '@react-native-picker/picker';
import React, {useState} from "react";
import { useDebounce } from 'use-debounce';
import { Text, View } from 'react-native';
import { useNavigate  } from 'react-router-native';

import RepositoryListContainer from './RepositoryListContainer';
import TextInput from './TextInput';
import theme from '../theme';
import useRepositories from '../hooks/useRepositories';

const RepositoryList = () => {
	const [selectedSorting, setSelectedSorting] = useState();
	const [text, onChangeText] = useState("");
	const [searchKeyword] = useDebounce(text, 500);
	const { repositories, fetchMore, loading } = useRepositories({selectedSorting, searchKeyword, first: 2});
	let navigate = useNavigate();

	const onEndReach = () => {
		fetchMore();
	};

	const showSingleItem = (item) => {
		navigate(`/${item.id}`);
	}

	return (
		<>
			{loading && <View><Text>Loading</Text></View>}
			{!loading && 
				<View>
					<FilterContainer selectedSorting={selectedSorting} setSelectedSorting={setSelectedSorting} onChangeText={onChangeText} text={text}/>
					<RepositoryListContainer onEndReach={onEndReach} repositories={repositories} showSingleItem={showSingleItem}/> 
				</View>
			}
		</>
	);
};

const FilterContainer = ({selectedSorting, setSelectedSorting, onChangeText, text}) => {
	return( 
		<View style={{padding: 10, backgroundColor: theme.colors.grey}}> 
			<SearcBar onChangeText={onChangeText} text={text} />
			<RepositorySorter selectedSorting={selectedSorting} setSelectedSorting={setSelectedSorting} />
		</View>
	)
}

const SearcBar = ({onChangeText, text}) => {
	return(
		<TextInput 	
			onChangeText={onChangeText}
			style={{marginBottom: 5}}
			placeholder="Search git repositories.."
			value={text}
		/>
	)
}
	
const RepositorySorter = ({selectedSorting, setSelectedSorting}) => {
	return(
		<Picker
			selectedValue={selectedSorting}
			style={{backgroundColor: theme.colors.grey, borderStyle: 'none', marginTop: 0}}
			onValueChange={(itemValue) => setSelectedSorting(itemValue)}>
			<Picker.Item label="Latest repositories" value="latest" />
			<Picker.Item label="Highest rated repositories" value="highest" />
			<Picker.Item label="Lowest rated repositories" value="lowest" />
		</Picker>
	)
}

export default RepositoryList;