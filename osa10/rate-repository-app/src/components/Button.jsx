import { Pressable as NativePressable, StyleSheet, Text } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
	button: {
		alignItems: 'center',
		backgroundColor: theme.colors.blue,
		borderRadius: 5,
		justifyContent: 'center',
		padding: 12
	},
	red: {
		backgroundColor: theme.colors.red,
	},
	flex: {
		flex: 1,
	},
	rightMargin: {
		marginRight: 10
	}
});

const Button = ({ applyFlex, applyRightGap, isRed, text, ...props}) => {
	const buttonStyle = [
		styles.button,
		applyFlex && styles.flex,
		applyRightGap && styles.rightMargin,
		isRed && styles.red,
	];

	return (
		<NativePressable style={buttonStyle} {...props}>
			<Text style={{color: theme.colors.textSecondary, fontWeight: theme.fontWeights.bold}}>{text} </Text>
		</NativePressable>
	)
};

export default Button;