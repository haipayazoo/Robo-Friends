import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import renderer from 'react-test-renderer';

import CounterButton from './CounterButton';

configure({ adapter: new Adapter() });

it('expect to render CounterButton component', () => {
	const mockColor = 'red';
	const tree = renderer.create(<CounterButton color={mockColor} />).toJSON();
	expect(tree).toMatchSnapshot();
});
