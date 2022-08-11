import { useUser } from '@auth0/nextjs-auth0';
import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
	const { user, error, isLoading } = useUser();

	return (
		<div>
			<Head>
				<title>Watchlist</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className=''>
				<h1 className='text-2xl font-bold'>Statistics</h1>
			</main>
		</div>
	);
};

export default Home;