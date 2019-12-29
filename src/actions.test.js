import * as actions from './actions';
import {
	CHANGE_SEARCH_FIELD,
	REQUEST_ROBOTS_PENDING,
	REQUEST_ROBOTS_SUCCESS
} from './constants';

import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import nock from 'nock';

const mockStore = configureMockStore([thunkMiddleware]);

it('should create an action to search robots', () => {
	const text = 'wooo';
	const expectedAction = {
		type: CHANGE_SEARCH_FIELD,
		payload: text
	};

	expect(actions.setSearchField(text)).toEqual(expectedAction);
});

describe('async actions', () => {
	afterEach(() => {
		nock.cleanAll();
	});

	it('handles requesting robots API', () => {
		const store = mockStore();
		store.dispatch(actions.requestRobots());
		const expectedAction = {
			type: REQUEST_ROBOTS_PENDING
		};

		return store.dispatch(actions.requestRobots()).then(() => {
			expect(store.getActions()[0]).toEqual(expectedAction);
		});
	});

	it('handles successful requests to robots API', () => {
		nock('https://jsonplaceholder.typicode.com')
			.get('/users')
			.reply(
				200,
				{
					id: '1',
					name: 'John Snow',
					email: 'johnsnow@gmail.com'
				},
				{ 'Access-Control-Allow-Origin': '*' }
			);

		const store = mockStore();

		const expectedActions = [
			{ type: REQUEST_ROBOTS_PENDING },
			{
				type: REQUEST_ROBOTS_SUCCESS,
				payload: {
					id: '1',
					name: 'John Snow',
					email: 'johnsnow@gmail.com'
				}
			}
		];

		return store.dispatch(actions.requestRobots()).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});
});
