import { Pressable, StyleSheet, View } from 'react-native';
import { Link } from "react-router-native";
import Constants from 'expo-constants';

import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
	container: {
		paddingTop: Constants.statusBarHeight,
		backgroundColor: theme.colors.black,
		padding: 20,
		flexDirection: 'row',
		justifyContent: 'space-around'
	}
});

const AppBar = () => {
	return (
		<View style={styles.container}>
			<Pressable>
				<Link to="/">
					<Text color="textSecondary">Repositories</Text>
				</Link>
			</Pressable>
			<Link to="/sign">
				<Text color="textSecondary">Sign in</Text>
			</Link>
		</View>	
	)
};

export default AppBar;