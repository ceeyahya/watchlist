import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { NextPage, GetServerSidePropsContext } from 'next';
import { RiLoader4Fill } from 'react-icons/ri';

import { fetchMovies } from 'lib/movies';
import { Movie } from 'types/Movie';

const Movie: NextPage<{ movie: Movie }> = ({ movie }) => {
	const { isLoading, isError, error, data } = useQuery(['movie'], fetchMovies, {
		initialData: movie,
	});

	if (isLoading) {
		return (
			<div className='fixed inset-0 h-screen'>
				<RiLoader4Fill className='h-6 w-6 animate-spin-slow' />
			</div>
		);
	}

	return (
		<div>
			<Image
				loading='eager'
				blurDataURL={movie?.cover}
				objectFit='cover'
				placeholder='blur'
				layout='intrinsic'
				className='shadow-md shadow-gray-200 rounded-md'
				width={217}
				height={314}
				src={movie?.cover || '/covers.png'}
				alt={`${movie?.title} Cover`}
			/>
			<h1>{movie.title}</h1>
			<p>{movie.synopsis || 'No synopsis as of now'}</p>
			<p>{movie.releaseYear || 'No release year as of now'}</p>
			<p>{movie.director.fullname}</p>
		</div>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const res = await fetchMovies();
	const movieId = context.query.id;

	const [movie] = res.filter(
		(movie: Movie) => movie?.id.toString() === movieId
	);

	return {
		props: { movie },
	};
}

export default Movie;
