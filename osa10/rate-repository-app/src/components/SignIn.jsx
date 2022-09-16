import * as yup from 'yup';

import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Formik } from 'formik';

import FormikTextInput from './FormikTextInput';
import theme from '../theme';

const styles = StyleSheet.create({
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

const validationSchema = yup.object().shape({  
	username: yup
		.string()     
		.required('Username is required'),
	password: yup
		.string()  
		.required('Password is required')
});

const SignIn = () => {
	const onSubmit = (values) => {
		console.log(values);
	};
	
	return (
		<Formik 
			initialValues={initialValues} 
			onSubmit={onSubmit}
			validationSchema={validationSchema}
		>
			{({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
		</Formik>
	);
};

const SignInForm = ({ onSubmit }) => {
	return (
		<View style={{margin: 15, flex: 1}}>
			<FormikTextInput name="username" placeholder="Username" />  
			<FormikTextInput secureTextEntry={true} name="password" placeholder="Password" />          
			<Pressable style={styles.buttonField} onPress={onSubmit}>
				<Text style={{color: theme.colors.textSecondary}}>Sign In</Text>
			</Pressable>
		</View>
	);
};

export default SignIn;