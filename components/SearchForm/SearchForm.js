import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import { useDebounce } from '../../hooks/useDebounce';
import { usePopup } from '../../hooks/usePopup';
import {
	StyledForm,
	Type,
	SearchButton,
	List,
	Spinner,
	StyledDropdown,
	StyledListItem,
	StyledInformation,
	StyledDescription,
	StyledInput,
} from './SearchForm.styled';

const MAX_RESULTS_INDEX = 5;

const SearchForm = ({ resultList, onSearch, loading }) => {
	const [inputValue, setInputValue] = useState('');
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedItemIdx, setSelectedItemIdx] = useState();
	const debouncedSearchQuery = useDebounce(searchQuery, 100);
	const ref = useRef();
	const [isListOpen, setIsListOpen] = usePopup(!!resultList.length, ref);

	useEffect(() => {
		onSearch(debouncedSearchQuery);
	}, [debouncedSearchQuery]);

	const onInputChange = (inputValue) => {
		setSearchQuery(inputValue);
		setInputValue(inputValue);
		setIsListOpen(true);
	};
	const onListItemSelect = (value, index) => {
		setSearchQuery('');
		setInputValue(value);
		setSelectedItemIdx(index);
		setIsListOpen(false);
	};
	const onSubmit = (ev) => ev.preventDefault();
	const onKeyDown = (evt) => {
		if (!resultList || !isListOpen) return;

		switch (evt.key) {
			case 'ArrowDown':
				evt.preventDefault();

				if (selectedItemIdx === undefined) {
					setSelectedItemIdx(0);
				} else {
					selectedItemIdx < MAX_RESULTS_INDEX
						? setSelectedItemIdx(selectedItemIdx + 1)
						: setSelectedItemIdx(MAX_RESULTS_INDEX);
				}
				break;

			case 'ArrowUp':
				evt.preventDefault();

				if (selectedItemIdx === undefined) return;
				else {
					selectedItemIdx > 0
						? setSelectedItemIdx(selectedItemIdx - 1)
						: setSelectedItemIdx(0);
				}
				break;

			case 'Enter':
				evt.preventDefault();

				if (
					selectedItemIdx === undefined ||
					resultList[selectedItemIdx] === undefined
				)
					return;

				onListItemSelect(resultList[selectedItemIdx].value, selectedItemIdx);

				break;

			case 'Escape':
				evt.preventDefault();

				setIsListOpen(false);

				break;

			default:
				break;
		}
	};

	return (
		<form onSubmit={onSubmit}>
			<StyledForm>
				<div
					data-testid="results-combobox"
					role="combobox"
					aria-haspopup={resultList && `listbox`}
					aria-expanded={resultList && isListOpen}
					aria-activedescendant={resultList && isListOpen && selectedItemIdx}
				>
					<svg viewBox="0 0 24 24" width="1em" height="1em">
						<path d="M17.464 6.56a8.313 8.313 0 1 1-15.302 6.504A8.313 8.313 0 0 1 17.464 6.56zm1.38-.586C16.724.986 10.963-1.339 5.974.781.988 2.9-1.337 8.662.783 13.65c2.12 4.987 7.881 7.312 12.87 5.192 4.987-2.12 7.312-7.881 5.192-12.87zM15.691 16.75l7.029 7.03a.75.75 0 0 0 1.06-1.06l-7.029-7.03a.75.75 0 0 0-1.06 1.06z"></path>
					</svg>
					<StyledInput
						aria-controls={resultList && 'location-search-listbox'}
						aria-autocomplete={resultList}
						onKeyDown={onKeyDown}
						aria-label="Pick-up location"
						data-testid="search-input"
						id="location-search"
						name="q"
						onChange={({ target }) => onInputChange(target.value)}
						placeholder="Pick-up location"
						type="search"
						value={inputValue}
					/>
					{loading && (
						<Spinner data-testid="loading-spinner">
							<i />
						</Spinner>
					)}
				</div>
				<SearchButton type="submit" shouldShow={isListOpen}>
					Search
				</SearchButton>
			</StyledForm>
			<StyledDropdown>
				{isListOpen && (
					<List
						data-testid="results-list"
						id="location-search-listbox"
						ref={ref}
						role="listbox"
					>
						{resultList.length > 0 &&
							resultList.map(
								({ type, title, description, id, value }, index) => {
									const isFocused = index === selectedItemIdx;
									return (
										<StyledListItem
											aria-hidden={!isListOpen}
											aria-selected={isFocused}
											data-testid={id}
											id={id}
											isFocused={isFocused}
											key={id}
											onClick={() => onListItemSelect(value, index)}
											role="option"
										>
											<Type type={type}>{type}</Type>
											<StyledInformation>
												<div>{title}</div>
												<StyledDescription>{description}</StyledDescription>
											</StyledInformation>
										</StyledListItem>
									);
								}
							)}
					</List>
				)}
			</StyledDropdown>
		</form>
	);
};

SearchForm.propTypes = {
	resultList: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			type: PropTypes.string,
			title: PropTypes.string.isRequired,
			description: PropTypes.string,
			value: PropTypes.string.isRequired,
		})
	),
	onSearch: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
};

export default SearchForm;
