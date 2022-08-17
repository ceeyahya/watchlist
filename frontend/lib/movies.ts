import axios from 'axios';

export const fetchMovies = async () => {
	const response = await axios.get('http://127.0.0.1:8080/movies');
	return response.data;
};

export const fetchMovie = async () => {
	const res = await axios.get('http://127.0.0.1:8080/movies');
	return res.data;
};
