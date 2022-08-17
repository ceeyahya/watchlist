import axios from 'axios';

export const fetchDirectors = async () => {
	const response = await axios.get('http://127.0.0.1:8080/directors');
	return response.data;
};
