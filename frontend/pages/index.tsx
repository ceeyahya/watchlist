import axios from 'axios';
import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage<{
	statistics: { movies: number; directors: number; countries: number };
}> = ({ statistics }) => {
	return (
		<div>
			<Head>
				<title>Watchlist</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className=''>
				<h1 className='text-2xl font-bold'>Statistics</h1>
				<dl className='mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3'>
					<div className='px-4 py-5 bg-white shadow-md shadow-gray-200 border border-gray-100 rounded-md overflow-hidden sm:p-6'>
						<dt className='text-sm font-medium text-gray-500 truncate'>
							Movies
						</dt>
						<dd className='mt-1 text-3xl tracking-tight font-semibold text-gray-900'>
							{statistics.movies}
						</dd>
					</div>

					<div className='px-4 py-5 bg-white shadow-md shadow-gray-200 border border-gray-100 rounded-md overflow-hidden sm:p-6'>
						<dt className='text-sm font-medium text-gray-500 truncate'>
							Directors
						</dt>
						<dd className='mt-1 text-3xl tracking-tight font-semibold text-gray-900'>
							{statistics.directors}
						</dd>
					</div>

					<div className='px-4 py-5 bg-white shadow-md shadow-gray-200 border border-gray-100 rounded-md overflow-hidden sm:p-6'>
						<dt className='text-sm font-medium text-gray-500 truncate'>
							Countries
						</dt>
						<dd className='mt-1 text-3xl tracking-tight font-semibold text-gray-900'>
							{statistics.countries}
						</dd>
					</div>
				</dl>
			</main>
		</div>
	);
};

export async function getServerSideProps() {
	const response = await axios.get('http://127.0.0.1:8080/statistics');

	return {
		props: {
			statistics: response.data,
		},
	};
}

export default Home;
