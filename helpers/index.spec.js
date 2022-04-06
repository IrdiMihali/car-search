import { getFormattedDataList } from './index';
import { responseMock, noResultsResposeMock } from '../tests/responseMock';
import { v4 as uuidv4 } from 'uuid';

jest.mock('uuid');
jest.useFakeTimers();

describe('Given `getFormattedDataList`', () => {
	it('should return a formatted list', () => {
		const result = getFormattedDataList(
			responseMock.results.docs,
			responseMock.results.numFound
		);

		expect(result).toStrictEqual([
			{
				description: 'Lisbon, Lisbon Region, Portugal',
				id: 'airport-28061',
				title: 'Lisbon Airport (LIS) ',
				type: 'Airport',
				value: 'Lisbon Airport (LIS) , Lisbon, Lisbon Region, Portugal',
			},
			{
				description: 'Região de Lisboa, Portugal',
				id: 'city-1991509',
				title: 'Lisbon',
				type: 'City',
				value: 'Lisbon, Região de Lisboa, Portugal',
			},
			{
				description: 'Região de Lisboa, Portugal',
				id: 'station-1991509',
				title: 'Lisbon',
				type: 'Station',
				value: 'Lisbon, Região de Lisboa, Portugal',
			},
			{
				description: 'Região de Lisboa, Portugal',
				id: 'Region-1991509',
				title: 'Lisbon',
				type: 'Region',
				value: 'Lisbon, Região de Lisboa, Portugal',
			},
			{
				description: 'Região de Lisboa, Portugal',
				id: 'district-1991509',
				title: 'Lisbon',
				type: 'District',
				value: 'Lisbon, Região de Lisboa, Portugal',
			},
		]);
	});

	describe('and when the list has no reults', () => {
		it('should return the correct output', () => {
			uuidv4.mockImplementation(() => 'uuid');
			const result = getFormattedDataList(
				noResultsResposeMock.results.docs,
				noResultsResposeMock.results.numFound
			);

			expect(result).toStrictEqual([
				{
					id: 'uuid',
					title: 'No results found',
				},
			]);
		});
	});
});
