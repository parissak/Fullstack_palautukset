import * as yup from 'yup';

import { Formik } from 'formik';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigate  } from 'react-router-native';

import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import useSignIn from '../hooks/useSignIn'

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
	const [signIn] = useSignIn();
	let navigate = useNavigate();

	const onSubmit = async (values) => {
		const { username, password } = values;

		try {
			await signIn({ username, password });	
			navigate("/");	
		} catch (e) {
			console.log("error", e);
		}
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