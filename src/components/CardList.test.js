import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import renderer from 'react-test-renderer';

import CardList from './CardList';

configure({ adapter: new Adapter() });

it('expect to render Card component', () => {
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
