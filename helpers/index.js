import { v4 as uuidv4 } from 'uuid';

const getJoinedValue = (info) => info.filter((text) => !!text).join(', ');

export const getFormattedDataList = (data, numFound) =>
	data.map(({ placeType, name, iata, city, region, country, bookingId }) => {
		if (numFound === 0)
			return {
				id: uuidv4(),
				title: name,
			};
		if (!bookingId)
			return {
				id: uuidv4(),
				title: name,
				value: name,
				type: 'Unknown',
			};

		const title = iata ? name + ' (' + iata + ') ' : name;
		const description = getJoinedValue([city, region, country]);
		const itemFormat = {
			id: bookingId,
			title,
			description,
			value: getJoinedValue([title, description]),
		};

		const places = {
			A: { ...itemFormat, type: 'Airport' },
			C: { ...itemFormat, type: 'City' },
			T: { ...itemFormat, type: 'Station' },
			P: { ...itemFormat, type: 'Region' },
			D: { ...itemFormat, type: 'District' },
		};
		return places[placeType];
	});
