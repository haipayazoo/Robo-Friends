import React from 'react';
import renderer from 'react-test-renderer';

import CardList from './CardList';

it('expect to render CardList component', () => {
	const mockRobots = [
		{
			id: 1,
			name: 'John Snow',
			username: 'JohnJohn',
			email: 'john@gmail.com'
		}
	];
	const tree = renderer.create(<CardList robots={mockRobots} />).toJSON();
	expect(tree).toMatchSnapshot();
});
