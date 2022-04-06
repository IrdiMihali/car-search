import styled from 'styled-components';

export const Header = styled.div`
	color: #fff;
	height: 64px;
	background: #1879ca;
`;

export const Container = styled.div`
	background-size: cover;
	background-position: inherit;
	display: block;

	main {
		display: block;
		height: inherit;
		background: #1879ca;

		@media (min-width: 1024px) {
			background: linear-gradient(#1879ca, rgba(24, 121, 202, 0));
		}
	}

	@media (min-width: 1024px) {
		background-image: url('../background-large.jpg');
		background-size: cover;
		background-repeat: no-repeat;
		background-position: 50%;
	}

	@media (min-height: 550px) and (min-width: 1024px) {
		height: min(calc(100vh), 596px);
	} ;
`;

export const MainContent = styled.div`
	h1 {
		color: #fff;
		margin: 0;
		padding: 16px;
		text-align: left;
		line-height: 35px;

		@media (min-width: 1024px) {
			font-size: 40px;
			line-height: 52px;
			padding-bottom: calc(4px * 2);
			padding-top: calc(4px * 6);
		}
	}

	@media (min-width: 1024px) {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-left: auto;
		margin-right: auto;
		max-width: 1142px;
	}
`;

export const BannerList = styled.ul`
	color: #fff;
	padding: 4px 16px;
	display: inline-flex;
	flex-direction: column;
	font-size: 1em;
	gap: 10px;
	list-style: none;

	li {
		display: flex;
		align-items: center;
		gap: 3px;
		font-size: 0.9em;

		svg {
			fill: #fff;
		}
	}

	@media (min-width: 1024px) {
		flex-direction: row;
	}
`;
