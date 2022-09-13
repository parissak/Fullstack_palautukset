import RepositoryList from './RepositoryList';
import Constants from 'expo-constants';
import { Text, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
	container: {
		marginTop: Constants.statusBarHeight,
		flexGrow: 1,
		flexShrink: 1,
	},
});

const Main = () => {
	return (
		<View style={styles.container}>
			<Text>Rate Repository Application</Text>
			<Text> <br/> </Text>
			<RepositoryList />
		</View>
	);
};

export default Main;