import axios from 'axios';
import { NextPage, GetServerSidePropsContext } from 'next';

const Movie: NextPage<{ movie: any }> = ({ movie }) => {
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
	const res = await axios.get('http://127.0.0.1:3000/movies');
	const movies = await res?.data;
	const movieId = context.query.id;

	const [movie] = movies.filter(
		(movie: any) => movie?.id.toString() === movieId
	);

	return {
		props: { movie },
	};
}

export default Movie;
