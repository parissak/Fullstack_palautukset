import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Link, useNavigate } from "react-router-native";
import { useApolloClient } from '@apollo/client';
import Constants from 'expo-constants';


import theme from '../theme';
import Text from './Text';
import useLoggedUser from '../hooks/useLoggedUser';
import useAuthStorage from '../hooks/useAuthStorage';


const styles = StyleSheet.create({
	container: {
		paddingTop: Constants.statusBarHeight,
		backgroundColor: theme.colors.black,
		padding: 20,
	}, 
	contentContainer: {
		flexGrow: 1,
		justifyContent: 'space-around',
		paddingBottom: 10
	}
});

const AppBar = () => {
	const user = useLoggedUser();
	const authStorage = useAuthStorage();
	const apolloClient = useApolloClient();
	let navigate = useNavigate();

	const signOut = async () => {
		try {
			await authStorage.removeAccessToken();	
			apolloClient.resetStore();
			navigate('/');
		} catch (e) {
			console.log(e);
		}
	}

	return (
		<View style={styles.container}>
			<ScrollView horizontal contentContainerStyle={styles.contentContainer}>
				<Link to="/">
					<Text color="textSecondary">Repositories</Text>
				</Link>

				{user &&
				<Link to="/review">
					<Text color="textSecondary">Create a review</Text>
				</Link>} 

				{user &&
				<Link to="/myreviews">
					<Text color="textSecondary">My reviews</Text>
				</Link>} 
				
				{user &&
				<Pressable onPress={signOut}>
					<Text color="textSecondary">Sign out</Text>
				</Pressable>} 

				{!user &&
				<Link to="/signIn">
					<Text color="textSecondary">Sign in</Text>
				</Link>}
				
				{!user &&
				<Link to="/signUp">
					<Text color="textSecondary">Sign up</Text>
				</Link>}

			</ScrollView>		
		</View>	
	)
};

export default AppBar;