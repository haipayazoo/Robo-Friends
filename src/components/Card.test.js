import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import renderer from 'react-test-renderer';

import Card from './Card';

configure({ adapter: new Adapter() });

it('expect to render Card component', () => {
	const tree = renderer.create(<Card />).toJSON();
	expect(tree).toMatchSnapshot();
});
