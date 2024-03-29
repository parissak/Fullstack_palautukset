import { Platform } from 'react-native';

const theme = {
	colors: {
		textPrimary: '#24292e',
		textSecondary: 'white',
		blue: '#0366d6',
		black: '#24292e',
		grey: '#e1e4e8',
		error: '#d73a4a',
		red: '#dc143c'
	},
	fontSizes: {	
		body: 14,
		subheading: 16,
	},
	fonts: {
		main: Platform.select({
			android: 'Roboto',
			ios: 'Arial',
			default: 'normal',
		})
	},
	fontWeights: {
		normal: '400',
		bold: '700',
	}
};
  
export default theme;