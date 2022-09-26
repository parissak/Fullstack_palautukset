import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';

import AppBar from './AppBar'
import RepositoryList from './RepositoryList';
import RepositoryItemWithURL from './RepositoryItemWithURL';
import {SignIn} from './SignIn'
import Text from './Text';

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		flexShrink: 1,
	},
});

const Main = () => {
	return (
		<View style={styles.container}>
			<AppBar />
			<Text fontWeight="bold" fontSize="subheading">Rate Repository Application</Text>
			<Routes>        
				<Route path="/" element={<RepositoryList />} exact />
				<Route path="/sign" element={<SignIn />} exact />     
				<Route path="/:repositoryId" element={<RepositoryItemWithURL item={undefined} showUrl={true} />} exact /> 
				<Route path="*" element={<Navigate to="/" replace />} />      
			</Routes>
		</View>
	);
};



export default Main;