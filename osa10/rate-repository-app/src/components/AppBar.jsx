import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Link } from "react-router-native";
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

	const signOut = async () => {
		try {
			await authStorage.removeAccessToken();	
			apolloClient.resetStore();
		} catch (e) {
			console.log(e);
		}
	}
 
	return (
		<View style={styles.container}>
			<ScrollView horizontal contentContainerStyle={styles.contentContainer}>
				<Pressable>
					<Link to="/">
						<Text color="textSecondary">Repositories</Text>
					</Link>
				</Pressable>

				{user &&
				<Pressable onPress={signOut}>
					<Text color="textSecondary">Sign out</Text>
				</Pressable>} 
				
				{!user &&
				<Link to="/sign">
					<Text color="textSecondary">Sign in</Text>
				</Link>}
			</ScrollView>		
		</View>	
	)
};

export default AppBar;