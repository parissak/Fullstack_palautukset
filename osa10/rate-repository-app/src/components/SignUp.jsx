import * as yup from 'yup';

import { Formik } from 'formik';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigate  } from 'react-router-native';

import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import useSignIn from '../hooks/useSignIn';
import useSignUp from '../hooks/useSignUp';


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
	passwordConfirmation: ''
};

const validationSchema = yup.object().shape({  
	username: yup
		.string().min(1).max(30)   
		.required('Username is required'),
	password: yup
		.string().min(5).max(50)
		.required('Password is required'),
	passwordConfirmation: yup
		.string()
		.oneOf([yup.ref('password'), null], "Passwords don't match")  
		.required('Password confirmation is required')
});

const SignUp = () => {
	const [signIn] = useSignIn()
	const [signUp] = useSignUp();
	let navigate = useNavigate();

	const onSubmit = async (values) => {
		const { username, password } = values;

		try {
			await signUp({ username, password });
			await signIn({ username, password });	
			navigate("/");	
		} catch (e) {
			console.log("error", e);
		}
	};
	
	return (
		<SignUpForm onSubmit={onSubmit}/>	
	);
};

const SignUpForm = ({ onSubmit }) => {
	return (
		<Formik 
			initialValues={initialValues} 
			onSubmit={onSubmit}
			validationSchema={validationSchema}
		>
			{({ handleSubmit }) => (
				<View style={{margin: 15, flex: 1}}>
					<FormikTextInput name="username" placeholder="Username" />  
					<FormikTextInput name="password" placeholder="Password" />  
					<FormikTextInput name="passwordConfirmation" placeholder="Password confirmation" />          
					<Pressable style={styles.buttonField} onPress={handleSubmit}>
						<Text style={{color: theme.colors.textSecondary}}>Sign Up</Text>
					</Pressable>
				</View>
			)}
		</Formik>
	);
};

export default SignUp;