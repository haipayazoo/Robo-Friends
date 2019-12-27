import React from 'react';
import renderer from 'react-test-renderer';

import Card from './Card';

it('expect to render Card component', () => {
	const tree = renderer.create(<Card />).toJSON();
	expect(tree).toMatchSnapshot();
});
