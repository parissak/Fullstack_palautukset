import RepositoryListContainer from '../src/components/RepositoryListContainer'

import { render } from '@testing-library/react-native';

describe('RepositoryList', () => {
	describe('RepositoryListContainer', () => {
		it('renders repository information correctly', () => {
			const repositories = {
				totalCount: 8,
				pageInfo: {
					hasNextPage: true,
					endCursor:
						'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
					startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
				},
				edges: [
					{
						node: {
							id: 'jaredpalmer.formik',
							fullName: 'jaredpalmer/formik',
							description: 'Build forms in React, without the tears',
							language: 'TypeScript',
							forksCount: 1619,
							stargazersCount: 21856,
							ratingAverage: 88,
							reviewCount: 3,
							ownerAvatarUrl:
							'https://avatars2.githubusercontent.com/u/4060187?v=4',
						},
						cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
					},
					{
						node: {
							id: 'async-library.react-async',
							fullName: 'async-library/react-async',
							description: 'Flexible promise-based React data loader',
							language: 'JavaScript',
							forksCount: 69,
							stargazersCount: 1760,
							ratingAverage: 72,
							reviewCount: 3,
							ownerAvatarUrl:
						'https://avatars1.githubusercontent.com/u/54310907?v=4',
						},
						cursor: 'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
					},
				],
			};

			const roundNumber = (number) => {
				return number >= 1000 ? (number/1000).toFixed(1) + 'k' : number
			}

			const { getAllByTestId  } = render(<RepositoryListContainer repositories={repositories} />);
			const repositoryItems = getAllByTestId('repositoryItem');
			const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;
			const [firstNode, secondNode] = [repositories.edges[0].node, repositories.edges[1].node]

			expect(firstRepositoryItem).toHaveTextContent(firstNode.fullName);
			expect(firstRepositoryItem).toHaveTextContent(firstNode.description);
			expect(firstRepositoryItem).toHaveTextContent(firstNode.language);
			expect(firstRepositoryItem).toHaveTextContent(roundNumber(firstNode.forksCount));
			expect(firstRepositoryItem).toHaveTextContent(roundNumber(firstNode.stargazersCount));
			expect(firstRepositoryItem).toHaveTextContent(firstNode.ratingAverage);
			expect(firstRepositoryItem).toHaveTextContent(firstNode.reviewCount);

			expect(secondRepositoryItem).toHaveTextContent(secondNode.fullName);
			expect(secondRepositoryItem).toHaveTextContent(secondNode.description);
			expect(secondRepositoryItem).toHaveTextContent(secondNode.language);
			expect(secondRepositoryItem).toHaveTextContent(roundNumber(secondNode.forksCount));
			expect(secondRepositoryItem).toHaveTextContent(roundNumber(secondNode.stargazersCount));
			expect(secondRepositoryItem).toHaveTextContent(secondNode.ratingAverage);
			expect(secondRepositoryItem).toHaveTextContent(secondNode.reviewCount);
		});
	});
});