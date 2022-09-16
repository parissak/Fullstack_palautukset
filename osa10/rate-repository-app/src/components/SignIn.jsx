import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Formik } from 'formik';

import FormikTextInput from './FormikTextInput';

import theme from '../theme';

const styles = StyleSheet.create({
	errorText: {
		marginTop: 5,
	},
	dataField: {
		borderColor: theme.colors.grey,
		borderRadius: 5,
		borderWidth: 2,
		justifyContent: 'center',
		marginBottom: 10,
		padding: 5,
	},
	buttonField: {
		alignItems: 'center',
		backgroundColor: theme.colors.blue,
		borderRadius: 5,
		justifyContent: 'center',
		padding: 7,
	},
});

const initialValues = {
	username: '',
	password: '',
};

const SignIn = () => {
	const onSubmit = (values) => {
		console.log(values);
	};
	
	return (
		<Formik initialValues={initialValues} onSubmit={onSubmit}>
			{({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
		</Formik>
	);
};

const SignInForm = ({ onSubmit }) => {
	return (
		<View style={{margin: 15, flex: 1}}>
			<View style={styles.dataField}>
				<FormikTextInput name="username" placeholder="Username" />  
			</View>  
			<View style={styles.dataField}>
				<FormikTextInput secureTextEntry={true} name="password" placeholder="Password" />          
			</View>
			<Pressable style={styles.buttonField} onPress={onSubmit}>
				<Text style={{color: theme.colors.textSecondary}}>Sign In</Text>
			</Pressable>
		</View>
	);
};

export default SignIn;