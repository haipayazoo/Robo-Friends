import React from 'react';
import { shallow } from 'enzyme';
import TestRenderer from 'react-test-renderer';

import CounterButton from './CounterButton';

it('expect to render CounterButton component', () => {
	const mockColor = 'red';
	const tree = TestRenderer.create(
		<CounterButton color={mockColor} />
	).toJSON();
	expect(tree).toMatchSnapshot();
});

it('correctly increments the counter', () => {
	const mockColor = 'red';
	const wrapper = shallow(<CounterButton color={mockColor} />);

	wrapper.find('[id="counter"]').simulate('click');
	expect(wrapper.state()).toEqual({ count: 2 });
	expect();
});
