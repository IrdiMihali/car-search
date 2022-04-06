import styled, { css } from 'styled-components';

export const StyledForm = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	max-width: 1142px;
	padding: 0 16px;
	position: relative;

	@media (min-width: 1024px) {
		padding-top: 16px;
		flex-direction: row;
	}

	> div:first-of-type {
		align-items: center;
		display: flex;
		display: inline-flex;
		height: var(--input-height);
		position: relative;
		width: 100%;

		svg {
			fill: #000;
			height: 16px;
			left: 16px;
			pointer-events: none;
			position: absolute;
			right: auto;
			width: 16px;
			z-index: 1;
		}
	}
`;

export const StyledInput = styled.input`
	border-radius: 10px 10px 0px 0px;
	border: 4px solid var(--main-border-color);
	box-sizing: border-box;
	font-size: 1em;
	font-weight: 400;
	height: 100%;
	left: 0;
	padding: 25px 40px 24px 40px;
	top: 0;
	width: 100%;

	:focus {
		outline-width: 0;
		::placeholder {
			transform: translateY(-1.5em);
			font-size: 0.7em;
		}
	}

	:hover {
		outline-width: 0;
	}

	::-webkit-search-cancel-button,
	::-webkit-search-results-decoration {
		display: none;
	}

	@media (min-width: 1024px) {
		border-radius: 10px 0px 0px 10px;
	}
`;

export const Spinner = styled.div`
	position: absolute;
	right: 10px;
	top: calc(50% - 10px);

	i {
		animation: around 5.4s infinite;
		display: inline-block;
		height: 20px;
		position: relative;
		width: 20px;
	}

	@keyframes around {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	i::after,
	i::before {
		content: '';
		animation: around 0.7s ease-in-out infinite;
		border-color: #1879ca #1879ca transparent transparent;
		border-radius: 20px;
		border-style: solid;
		border-width: 2px;
		box-sizing: border-box;
		display: inline-block;
		height: 100%;
		position: absolute;
		width: 100%;
	}

	i::after {
		animation: around 0.7s ease-in-out 0.1s infinite;
		background: transparent;
	}
`;

export const StyledDropdown = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	max-width: 1142px;
	padding: 0 16px;
	position: relative;

	@media (min-width: 1024px) {
		flex-direction: row;
	}
`;

export const List = styled.ul`
	animation: fadeIn 0.5s;
	background-color: #fff;
	border-radius: 4px;
	border: none;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.16);
	margin-block-end: 0;
	margin-block-start: 0;
	max-height: 100vh;
	overflow-y: scroll;
	padding-inline-start: 0;
	padding: 0px;
	position: relative;
	transition: max-height 0.5s ease-in-out, opacity 0.1s ease;
	width: 100%;
	will-change: opacity;
`;

export const StyledListItem = styled.li`
	align-items: center;
	border-radius: 4px;
	cursor: pointer;
	display: flex;
	flex-wrap: nowrap;
	gap: 10px;
	padding: calc(4px * 3);
	text-align: match-parent;

	${({ isFocused }) =>
		isFocused &&
		css`
			background-color: #d1e8fa;
		`}
`;

export const Type = styled.div`
	align-items: center;
	border-radius: 4px;
	border: none;
	color: #fff;
	display: inline-block;
	display: inline-flex;
	flex-shrink: 0;
	font-size: 0.8em;
	font-weight: 500;
	height: 0.8rem;
	justify-content: center;
	line-height: 0.8rem;
	min-width: 5.1rem;
	padding: 0.3rem 0;
	padding: 8px;
	text-align: center;
	width: 70px;

	${({ type }) =>
		type === 'Airport'
			? css`
					color: #262626;
					background: #ff8000;
			  `
			: type === 'City' || type === 'Station'
			? css`
					background: #1879ca;
			  `
			: type === 'Region'
			? css`
					color: #262626;
					background: #f1c74c;
			  `
			: type === 'Region'
			? css`
					color: #262626;
					background: #068323;
			  `
			: css`
					display: none;
			  `}
`;

export const StyledInformation = styled.div`
	align-items: flex-start;
	display: flex;
	flex-direction: column;
	font-weight: 400;
	line-height: 20px;
	text-align: start;
`;
export const StyledDescription = styled.div`
	font-size: 0.8em;
	color: #474747;
	font-weight: 500;
`;

export const SearchButton = styled.button`
	align-items: center;
	background-color: #068323 !important;
	border-bottom: 4px solid var(--main-border-color);
	border-left: 4px solid var(--main-border-color);
	border-radius: 0px 0px 10px 10px;
	border-right: 4px solid var(--main-border-color);
	border-top: none;
	box-sizing: border-box;
	color: #fff;
	cursor: pointer;
	font-size: 1.4em;
	font-weight: 700;
	height: var(--input-height);
	justify-content: center;
	line-height: normal;
	margin: 0;
	min-height: 44px;
	overflow: visible;
	padding: calc(4px * 2) 16px;
	text-align: center;
	text-decoration: none;
	transition: background-color ease-in-out 0.1s, color ease-in-out 0.1s;
	vertical-align: middle;
	display: ${({ shouldShow }) => shouldShow && 'none'};

	:active {
		background-color: #056b1d;
	}

	@media (min-width: 1024px) {
		border-bottom: 4px solid var(--main-border-color);
		border-left: none;
		border-radius: 0px 10px 10px 0px;
		border-right: 4px solid var(--main-border-color);
		border-top: 4px solid var(--main-border-color);
		display: block;
	}
`;
