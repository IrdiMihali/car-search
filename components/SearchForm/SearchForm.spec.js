import { render, fireEvent, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import 'jest-styled-components';

import SearchForm from './SearchForm';

const resultListMock = [
	{
		description: 'Bergamo, Lombardy, Italy',
		id: 'airport-19926',
		title: 'Bergamo Airport (BGY) ',
		type: 'Airport',
		value: 'Bergamo Airport (BGY) , Bergamo, Lombardy, Italy',
	},
	{
		description: 'Lombardia, Italy',
		id: 'city-1295131',
		title: 'Milan',
		type: 'City',
		value: 'Milan, Lombardia, Italy',
	},
	{
		description: 'Lombardia, Italy',
		id: 'district-1295131',
		title: 'Milan',
		type: 'District',
		value: 'Milan, Lombardia, Italy',
	},
	{
		description: 'Lombardia, Italy',
		id: 'station-1295131',
		title: 'Milan',
		type: 'Station',
		value: 'Milan, Lombardia, Italy',
	},
];

describe('Given `SearchForm` component', () => {
	const initialProps = {
		resultList: [],
		onSearch: jest.fn(),
		loading: false,
	};

	jest.useFakeTimers();

	it('should render successfully', () => {
		const { container } = render(<SearchForm {...initialProps} />);

		expect(container).toMatchSnapshot();
	});

	describe('When the user types in the input', () => {
		it('should show a spinner while it is loading', () => {
			render(<SearchForm {...initialProps} loading />);

			fireEvent.change(screen.getByTestId('search-input'), {
				target: { value: 'Italy' },
			});

			expect(screen.queryByTestId('loading-spinner')).toBeInTheDocument();
		});

		it('should trigger the `onSearch` function', () => {
			const onSearch = jest.fn();
			render(<SearchForm {...initialProps} onSearch={onSearch} />);

			fireEvent.change(screen.getByTestId('search-input'), {
				target: { value: 'Italy' },
			});

			act(() => jest.runAllTimers());

			expect(onSearch).toHaveBeenCalledWith('Italy');
		});

		describe('and the user enters 1 character', () => {
			it('should NOT display the listbox', () => {
				render(<SearchForm {...initialProps} />);
				const listbox = screen.queryByTestId('results-list');

				fireEvent.change(screen.getByTestId('search-input'), {
					target: { value: 'I' },
				});

				expect(listbox).not.toBeInTheDocument();
			});
		});

		describe('and the user enters more than 1 character', () => {
			it('should display the list of results', () => {
				render(<SearchForm {...initialProps} resultList={resultListMock} />);
				const input = screen.getByTestId('search-input');
				const listbox = screen.queryByTestId('results-list');

				fireEvent.change(input, { target: { value: 'Ital' } });

				expect(listbox).toBeInTheDocument();
			});

			describe('and the user presses the Arrow Down Key', () => {
				beforeEach(() => {
					render(<SearchForm {...initialProps} resultList={resultListMock} />);
				});

				it('should focus the first option in the list', () => {
					fireEvent.keyDown(screen.getByTestId('search-input'), {
						key: 'ArrowDown',
					});

					expect(screen.queryByTestId(resultListMock[0].id)).toHaveAttribute(
						'aria-selected',
						'true'
					);
				});
			});

			describe('and the user presses the Arrow Up Key from the forth option', () => {
				beforeEach(() => {
					render(<SearchForm {...initialProps} resultList={resultListMock} />);
					resultListMock.forEach(() =>
						fireEvent.keyDown(screen.getByTestId('search-input'), {
							key: 'ArrowDown',
						})
					);
				});

				it('should focus the third option in the list', () => {
					fireEvent.keyDown(screen.getByTestId('search-input'), {
						key: 'ArrowUp',
					});

					expect(screen.queryByTestId(resultListMock[2].id)).toHaveAttribute(
						'aria-selected',
						'true'
					);
				});
			});

			describe('and the user presses the Enter key', () => {
				beforeEach(() => {
					render(<SearchForm {...initialProps} resultList={resultListMock} />);
					fireEvent.keyDown(screen.getByTestId('search-input'), {
						key: 'ArrowDown',
					});
				});

				it('should close the dropdown list and select the item', () => {
					fireEvent.keyDown(screen.getByTestId('search-input'), {
						key: 'Enter',
					});

					expect(screen.queryByTestId('results-list')).not.toBeInTheDocument();

					expect(screen.getByTestId('search-input').value).toBe(
						resultListMock[0].value
					);
				});
			});

			describe('and the user clicks the listbox option', () => {
				it('should select the listbox option', () => {
					render(<SearchForm {...initialProps} resultList={resultListMock} />);
					const listItem = screen.queryByTestId(resultListMock[0].id);

					fireEvent.click(listItem);

					expect(screen.getByTestId('search-input').value).toBe(
						resultListMock[0].value
					);
				});
			});
		});
	});
});
