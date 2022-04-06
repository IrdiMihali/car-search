import { useEffect, useState } from 'react';

export const usePopup = (isInitialOpen = false, ref) => {
	const [isPopupOpen, setIsPopupOpen] = useState(isInitialOpen);

	useEffect(() => {
		const checkIfClickedOutside = (e) => {
			if (isPopupOpen && ref.current && !ref.current.contains(e.target)) {
				setIsPopupOpen(false);
			}
		};

		document.addEventListener('mousedown', checkIfClickedOutside);

		return () => {
			document.removeEventListener('mousedown', checkIfClickedOutside);
		};
	}, [isPopupOpen]);

	return [isPopupOpen, setIsPopupOpen];
};
