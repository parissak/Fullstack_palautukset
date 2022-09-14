import { Pressable, StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';

import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
	container: {
		paddingTop: Constants.statusBarHeight,
		backgroundColor: theme.colors.black,
		padding: 20,
	}
});

const AppBar = () => {
	return (
		<Pressable> 
			<View style={styles.container}>
				<Text color="textSecondary">Repositories</Text>
			</View>
		</Pressable>
	)
};

export default AppBar;