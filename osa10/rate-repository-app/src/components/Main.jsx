import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';

import AppBar from './AppBar'
import RepositoryList from './RepositoryList';
import RepositoryItemWithURL from './RepositoryItemWithURL';
import Review from './Review';
import {SignIn} from './SignIn'
import SignUp from './SignUp';
import UserReviews from './UserReviews';


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
			<Routes>        
				<Route path="/" element={<RepositoryList />} exact />
				<Route path="/myreviews" element={<UserReviews />} exact />
				<Route path="/review" element={<Review />} exact />     
				<Route path="/signIn" element={<SignIn />} exact />    
				<Route path="/signUp" element={<SignUp />} exact />   
				<Route path="/:repositoryId" element={<RepositoryItemWithURL item={undefined} showUrl={true} />} exact /> 
				<Route path="*" element={<Navigate to="/" replace />} />      
			</Routes>
		</View>
	);
};



export default Main;