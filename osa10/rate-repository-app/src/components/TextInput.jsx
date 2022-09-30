import { TextInput as NativeTextInput, StyleSheet, View } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
	inputField: {
		backgroundColor: 'white',
		borderRadius: 5,
		borderWidth: 2,
		marginBottom: 10,
		padding: 5,
		borderColor: theme.colors.grey
	},
	error: {
		borderColor: theme.colors.error,
	}
});

const TextInput = ({ style, error, ...props }) => {
	const textInputStyle = [
		styles.inputField,
		error && styles.error,
		style,
	];

	return (
		<View style={textInputStyle}>
			<NativeTextInput {...props} />
		</View>
	)
};

export default TextInput;