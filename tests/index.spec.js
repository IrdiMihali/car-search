import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import 'jest-styled-components';

import Home from '@/pages/index';
import { responseMock } from './responseMock';

jest.useFakeTimers();

describe('Given `Home`', () => {
	beforeEach(() => {
		fetch.resetMocks();
	});

	it('should render correctly', () => {
		const { container } = render(<Home />);

		expect(container).toMatchSnapshot();
	});

	describe('When the user starts typing on the Pick-up Location input', () => {
		describe('and user enters 1 character', () => {
			it('should NOT make a fetch request', () => {
				render(<Home />);
				const input = screen.getByTestId('search-input');

				fireEvent.change(input, { target: { value: 'i' } });

				act(() => {
					jest.advanceTimersByTime(500);
				});

				expect(fetch).not.toHaveBeenCalled();
			});
		});

		describe('and the user enters more than 1 character', () => {
			let input;

			beforeEach(async () => {
				fetch.mockResponse(JSON.stringify(responseMock));

				render(<Home />);
				input = screen.getByTestId('search-input');

				fireEvent.change(input, { target: { value: 'Portugal' } });

				act(() => {
					jest.advanceTimersByTime(500);
				});

				await waitFor(() =>
					expect(screen.queryByTestId('loading-spinner')).toBeInTheDocument()
				);
				await waitFor(() =>
					expect(
						screen.queryByTestId('loading-spinner')
					).not.toBeInTheDocument()
				);
			});

			it('should request the correct url', () => {
				expect(fetch).toHaveBeenCalledWith(
					'https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en&solrRows=6&solrTerm=Portugal'
				);
			});

			it('should render a combobox', async () => {
				responseMock.results.docs.forEach(({ bookingId }) => {
					expect(screen.queryByTestId(bookingId)).toBeInTheDocument();
				});
			});

			describe('and user selects a combobox suggestion', () => {
				it('should update the input value', () => {
					const option = screen.queryByText('Lisbon Airport (LIS)');

					fireEvent.click(option);

					expect(input.value).toBe(
						'Lisbon Airport (LIS) , Lisbon, Lisbon Region, Portugal'
					);
				});
			});
		});
	});
});
