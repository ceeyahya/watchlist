import axios from 'axios';

export const fetchStatistics = async () => {
	const response = await axios.get('http://127.0.0.1:8080/statistics');
	return response.data;
};
