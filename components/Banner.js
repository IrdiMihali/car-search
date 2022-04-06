import { BannerList } from '../styles/styles';
const Banner = () => {
	return (
		<BannerList className="advantages-list">
			<li>
				<svg viewBox="0 0 128 128" width="1em" height="1em">
					<path d="M56.33 100a4 4 0 0 1-2.82-1.16L20.68 66.12a4 4 0 1 1 5.64-5.65l29.57 29.46 45.42-60.33a4 4 0 1 1 6.38 4.8l-48.17 64a4 4 0 0 1-2.91 1.6z"></path>
				</svg>
				Free cancelation on most bookings
			</li>
			<li>
				<svg viewBox="0 0 128 128" width="1em" height="1em">
					<path d="M56.33 100a4 4 0 0 1-2.82-1.16L20.68 66.12a4 4 0 1 1 5.64-5.65l29.57 29.46 45.42-60.33a4 4 0 1 1 6.38 4.8l-48.17 64a4 4 0 0 1-2.91 1.6z"></path>
				</svg>
				60,000+ locations
			</li>
			<li>
				<svg viewBox="0 0 128 128" width="1em" height="1em">
					<path d="M56.33 100a4 4 0 0 1-2.82-1.16L20.68 66.12a4 4 0 1 1 5.64-5.65l29.57 29.46 45.42-60.33a4 4 0 1 1 6.38 4.8l-48.17 64a4 4 0 0 1-2.91 1.6z"></path>
				</svg>
				Customer support in 40+ languages
			</li>
		</BannerList>
	);
};

export default Banner;
