import * as actions from './actions';
import {
	CHANGE_SEARCH_FIELD,
	REQUEST_ROBOTS_PENDING,
	REQUEST_ROBOTS_SUCCESS,
	REQUEST_ROBOTS_FAILED
} from './constants';

import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import fetchMock from 'fetch-mock';

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
		fetchMock.restore();
	});

	it('handles requesting robots API', () => {
		const store = mockStore();
		store.dispatch(actions.requestRobots());
		const action = store.getActions();
		const expectedAction = {
			type: REQUEST_ROBOTS_PENDING
		};
		expect(action[0]).toEqual(expectedAction);
	});

	it('handles successful requests to robots API', () => {
		fetchMock.getOnce('', {
			body: {
				id: '1',
				name: 'John Snow',
				email: 'johnsnow@gmail.com'
			},
			headers: { 'content-type': 'application/json' }
		});

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
