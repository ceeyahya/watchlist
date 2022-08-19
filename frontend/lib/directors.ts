import axios from 'axios';

export const fetchDirectors = async () => {
	const response = await axios.get(
		'https://watchlist-api.onrender.com/directors'
	);
	return response.data;
};

export const fetchDirector = async (id: string | string[] | undefined) => {
	const res = await axios.get(
		`https://watchlist-api.onrender.com/director/${id}`
	);
	return res.data;
};

export const fetchDirectorMovies = async (
	id: string | string[] | undefined
) => {
	const res = await axios.get(
		`https://watchlist-api.onrender.com/director-movies/${id}`
	);
	return res.data;
};
