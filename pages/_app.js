import Head from 'next/head';
import PropTypes from 'prop-types';

import { Header } from '../styles/styles';
import '../styles/styles.css';

const MyApp = ({ Component, pageProps }) => {
	return (
		<div>
			<Head>
				<title>Cheap Car Hire</title>
			</Head>
			<Header />
			<Component {...pageProps} />
		</div>
	);
};

MyApp.propTypes = {
	Component: PropTypes.func,
	pageProps: PropTypes.object,
};

export default MyApp;
