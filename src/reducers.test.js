import {
	CHANGE_SEARCH_FIELD,
	REQUEST_ROBOTS_PENDING,
	REQUEST_ROBOTS_SUCCESS,
	REQUEST_ROBOTS_FAILED
} from './constants';

import * as reducers from './reducers';

describe('searchRobots', () => {
	const initialStateSearch = {
		searchField: ''
	};
	it('should return the initial state', () => {
		expect(reducers.searchRobots(undefined, {})).toEqual({ searchField: '' });
	});

	it('should handle CHANGE_SEARCHFIELD', () => {
		expect(
			reducers.searchRobots(initialStateSearch, {
				type: CHANGE_SEARCH_FIELD,
				payload: 'abc'
			})
		).toEqual({
			searchField: 'abc'
		});
	});
});

describe('requestRobots', () => {
	const initialStateRobots = {
		robots: [],
		error: '',
		isPending: false
	};

	it('should return the initial state', () => {
		expect(reducers.requestRobots(undefined, {})).toEqual(initialStateRobots);
	});

	it('should handle REQUEST_ROBOTS_PENDING action', () => {
		expect(
			reducers.requestRobots(initialStateRobots, {
				type: REQUEST_ROBOTS_PENDING
			})
		).toEqual({
			robots: [],
			error: '',
			isPending: true
		});
	});

	it('should handle REQUEST_ROBOTS_SUCCESS action', () => {
		expect(
			reducers.requestRobots(initialStateRobots, {
				type: REQUEST_ROBOTS_SUCCESS,
				payload: [
					{
						id: '123',
						name: 'test',
						email: 'test@gmail.com'
					}
				]
			})
		).toEqual({
			robots: [
				{
					id: '123',
					name: 'test',
					email: 'test@gmail.com'
				}
			],
			error: '',
			isPending: false
		});
	});

	it('should handle REQUEST_ROBOTS_FAILED action', () => {
		expect(
			reducers.requestRobots(initialStateRobots, {
				type: REQUEST_ROBOTS_FAILED,
				payload: 'OH NO!!!!!'
			})
		).toEqual({
			robots: [],
			error: 'OH NO!!!!!',
			isPending: false
		});
	});
});
