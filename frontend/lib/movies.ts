import axios from 'axios';

export const fetchMovies = async () => {
	const response = await axios.get('https://watchlist-api.onrender.com/movies');
	return response.data;
};

export const fetchMovie = async (id: string | string[] | undefined) => {
	const res = await axios.get(`https://watchlist-api.onrender.com/movie/${id}`);
	return res.data;
};
