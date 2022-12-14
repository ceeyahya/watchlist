import { useQuery } from '@tanstack/react-query';
import Head from 'next/head';
import Image from 'next/image';
import { RiLoader4Fill } from 'react-icons/ri';
import { NextPage, GetServerSidePropsContext } from 'next';

import { Director } from 'types/Director';
import { fetchDirector, fetchDirectorMovies } from 'lib/directors';
import { Movie, Movies } from 'types/Movie';
import Link from 'next/link';

const Director: NextPage<{ director: Director; movies: Movies }> = ({
	director,
	movies,
}) => {
	return (
		<div className='py-4 sm:py-24 max-w-3xl mx-auto space-y-8'>
			<Head>
				<title>{director.fullname} - Watchlist</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div className='flex flex-col md:flex-col lg:flex-row items-start space-y-2 md:space-y-0 md:space-x-8 mx-auto'>
				<Image
					loading='eager'
					blurDataURL={director?.avatar}
					objectFit='cover'
					placeholder='blur'
					layout='intrinsic'
					className='shadow-md shadow-gray-200 rounded-md'
					width={217}
					height={314}
					src={director?.avatar || '/covers.png'}
					alt={`${director?.fullname} Avatar`}
				/>
				<div>
					<h1 className='text-2xl font-bold'>{director.fullname}</h1>
					<p className='text-gray-500'>{director.nationality}</p>
				</div>
			</div>
			<div>
				<h2 className='py-2 text-2xl font-bold'>Other Movies in the Library</h2>
				<div className='py-8 flex flex-col items-center sm:grid md:grid-cols-3 lg:grid-cols-4 gap-y-6 sm:gap-x-4'>
					{movies?.map((movie: Movie) => (
						<Link key={movie?.id} href={`/movies/${movie.id}`}>
							<a className='group '>
								<div className='space-y-4'>
									<Image
										loading='eager'
										blurDataURL={movie?.cover ? movie.cover : '/covers.png'}
										objectFit='cover'
										placeholder='blur'
										layout='responsive'
										className='group-hover:hover:scale-105 group-hover:rounded-md shadow-md shadow-gray-200 rounded-md transition duration-300'
										width={217}
										height={314}
										src={movie?.cover || '/covers.png'}
										alt={`${movie?.title} Cover`}
									/>
									<div className='flex items-center space-x-2 lg:space-x-4'>
										<div>
											<h2
												className='group-hover:translate-x-1 text-lg font-bold w-44 truncate transition duration-300'
												aria-label={movie?.title}>
												{movie?.title}
											</h2>
											<p className='group-hover:translate-x-1 text-gray-400 text-sm transition duration-300'>
												<span
													className={`${
														movie.status ? 'text-green-600' : 'text-orange-600'
													}`}>
													{movie?.status ? 'Seen' : 'Watchlist'}
												</span>{' '}
												- {movie?.releaseYear}
											</p>
											<p className='group-hover:translate-x-1 text-gray-400 transition duration-300'></p>
										</div>
									</div>
								</div>
							</a>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const res = await fetchDirector(context.query.id);
	const moviesPerDirector = await fetchDirectorMovies(context.query.id);

	return {
		props: { director: res, movies: moviesPerDirector },
	};
}

export default Director;
