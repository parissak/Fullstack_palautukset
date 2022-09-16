import { TextInput as NativeTextInput, StyleSheet, View } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
	inputField: {
		borderRadius: 5,
		borderWidth: 2,
		marginBottom: 10,
		padding: 5,
	}
});

const TextInput = ({ style, error, ...props }) => {

	return (
		<View style={[styles.inputField, {borderColor: error ? theme.colors.error : theme.colors.grey}]}>
			<NativeTextInput {...props} />
		</View>
	)
};

export default TextInput;