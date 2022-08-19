import axios from 'axios';

export const fetchStatistics = async () => {
	const response = await axios.get(
		'https://watchlist-api.onrender.com/statistics'
	);
	return response.data;
};
