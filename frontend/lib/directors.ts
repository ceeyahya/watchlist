import axios from 'axios';

export const fetchDirectors = async () => {
	const response = await axios.get('http://127.0.0.1:8080/directors');
	return response.data;
};

export const fetchDirector = async (id: string | string[] | undefined) => {
	const res = await axios.get(`http://127.0.0.1:8080/director/${id}`);
	return res.data;
};

export const fetchDirectorMovies = async (
	id: string | string[] | undefined
) => {
	const res = await axios.get(`http://127.0.0.1:8080/director-movies/${id}`);
	return res.data;
};
