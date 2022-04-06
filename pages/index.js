import { useEffect, useState } from 'react';

import Banner from '../components/Banner';
import SearchForm from '../components/SearchForm/SearchForm';
import { getFormattedDataList } from '../helpers';
import { Container, MainContent } from '../styles/styles';

const MAX_NUMBER_OF_RESULTS = 6;
const SEARCH_API = `https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en&solrRows=${MAX_NUMBER_OF_RESULTS}`;

const getSearchUrl = (searchQuery) =>
	`${SEARCH_API}&solrTerm=${encodeURI(searchQuery)}`;

const Home = () => {
	const [resultList, setResultList] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (searchQuery.length <= 1) {
			setResultList([]);

			return;
		}
		setLoading(true);

		const fetchData = async () => {
			try {
				setLoading(true);

				const response = await fetch(getSearchUrl(searchQuery));
				const data = await response.json();

				setResultList(
					data?.results?.docs
						? getFormattedDataList(data?.results?.docs, data?.results?.numFound)
						: []
				);
			} catch (e) {
				setResultList([]);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [searchQuery]);

	return (
		<Container>
			<main>
				<MainContent>
					<h1>Car Hire – Search, Compare & Save</h1>
					<Banner />
					<SearchForm
						resultList={resultList}
						loading={loading}
						onSearch={setSearchQuery}
					/>
				</MainContent>
			</main>
		</Container>
	);
};

export default Home;
