import axios from 'axios';
import { NextPage, GetServerSidePropsContext } from 'next';
import { Movie } from 'types/Movie';

const Movie: NextPage<{ movie: Movie }> = ({ movie }) => {
	return (
		<div>
			<img src={movie?.cover || '/covers.png'} alt='' />
			<h1>{movie.title}</h1>
			<p>{movie.synopsis || 'No synopsis as of now'}</p>
			<p>{movie.releaseYear || 'No release year as of now'}</p>
			<p>{movie.director.fullname}</p>
		</div>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const res = await axios.get('http://127.0.0.1:8080/movies');
	const movies = await res?.data;
	const movieId = context.query.id;

	const [movie] = movies.filter(
		(movie: Movie) => movie?.id.toString() === movieId
	);

	return {
		props: { movie },
	};
}

export default Movie;
