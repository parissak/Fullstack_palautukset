import { StatusBar } from 'expo-status-bar';
import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/client';

import AuthStorage from './src/utils/authStorage';
import createApolloClient from './src/utils/apolloClient';
import Main from './src/components/Main';
import AuthStorageContext from './src/contexts/AuthStorageContext';

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

const App = () => {
	return (
		<>
			<NativeRouter>
				<ApolloProvider client={apolloClient}>
					<AuthStorageContext.Provider value={authStorage}>
						<Main />
					</AuthStorageContext.Provider>
				</ApolloProvider>
			</NativeRouter>
			<StatusBar style="auto" />
		</>
	);
};

export default App;