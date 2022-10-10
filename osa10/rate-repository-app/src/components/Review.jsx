import * as yup from 'yup';

import { Formik } from 'formik';
import { View } from 'react-native';
import { useNavigate  } from 'react-router-native';

import Button from './Button';
import FormikTextInput from './FormikTextInput';
import useReview from '../hooks/useReview';


const initialValues = {
	ownerName: '',
	repositoryName: '',
	rating: '',
	text: ''
};

const validationSchema = yup.object().shape({  
	ownerName: yup
		.string()     
		.required('Repository owner name is required'),
	repositoryName: yup
		.string()  
		.required('Repository name is required'),
	rating: yup
		.number().min(0).max(100)
		.required('Rating is required'),
	review: yup
		.string()
});

const Review = () => {
	const [reviewRepository] = useReview();
	let navigate = useNavigate(); 

	const onSubmit = async (values) => {
		const { ownerName, repositoryName, text } = values;
		const rating = parseInt(values.rating)

		try {
			const data = await reviewRepository({ ownerName, repositoryName, rating, text });	
			const repositoryId = data.repositoryId
			navigate(`/${repositoryId}`);	
		} catch (e) {
			console.log("error", e);
		}
	};
	
	return (
		<ReviewForm onSubmit={onSubmit}/>	
	);
};

const ReviewForm = ({onSubmit}) => {
	return (
		<Formik 
			initialValues={initialValues} 
			onSubmit={onSubmit}
			validationSchema={validationSchema}
		>
			{({ handleSubmit }) => (
				<View style={{margin: 15, flex: 1}}>
					<FormikTextInput name="ownerName" placeholder="Repository owner name" />  
					<FormikTextInput name="repositoryName" placeholder="Repository name" /> 
					<FormikTextInput name="rating" placeholder="Rating between 0 and 100" />  
					<FormikTextInput name="text" placeholder="Review" />             
					<Button text={"Create a review"} onPress={handleSubmit} />
				</View>
			)}
		</Formik>
	);
};

export default Review;