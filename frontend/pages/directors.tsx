import { useState } from 'react';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import type { NextPage } from 'next';
import axios from 'axios';
import { useUser } from '@auth0/nextjs-auth0';
import { RiDeleteBin2Fill } from 'react-icons/ri';

import { Notification } from 'components/Misc/Notification';
import { Director } from 'types/Director';
import { fetchDirectors } from 'lib/directors';

const Directors: NextPage = () => {
	const { isLoading, data } = useQuery(['directors'], fetchDirectors);
	const [show, setShow] = useState(false);
	const { user } = useUser();

	const handleDelete = async (id: number) => {
		await axios.delete(`http://127.0.0.1/director/${id}`);
		setShow(true);
	};

	if (isLoading) {
		return (
			<div className='fixed inset-0 h-screen flex flex-col justify-center items-center'>
				<h1 className='text-4xl font-bold'>Loading Data ...</h1>
			</div>
		);
	}

	return (
		<div>
			<Head>
				<title>Directors - Watchlist</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main>
				<h1 className='text-2xl font-bold'>Directors</h1>
				<div className='flex flex-col items-center sm:grid md:grid-cols-3 lg:grid-cols-4 sm:gap-x-4'>
					{data.map((director: Director) => (
						<Link href={`/directors/${director.id}`}>
							<a>
								<div key={director.id} className='group py-8 space-y-4'>
									<Image
										loading='eager'
										blurDataURL={director?.avatar}
										objectFit='cover'
										placeholder='blur'
										layout='responsive'
										className='group-hover:hover:scale-105 group-hover:rounded-md shadow-md shadow-gray-200 rounded-md transition duration-300'
										width={217}
										height={314}
										src={director?.avatar || '/covers.png'}
										alt={`${director?.fullname} Avatar`}
									/>
									<div className='flex items-center space-x-2 md:space-x-4'>
										<div>
											<h2 className='font-bold text-lg w-44 truncate'>
												{director.fullname}
											</h2>
											<p className='text-gray-500'>{director.nationality}</p>
										</div>
										{user ? (
											<button
												onClick={() => handleDelete(director?.id)}
												className='text-red-600 hover:text-red-800 transition duration-300'>
												<RiDeleteBin2Fill className='h-5 w-5' />
											</button>
										) : null}
									</div>
								</div>
							</a>
						</Link>
					))}
				</div>
			</main>
			<Notification
				show={show}
				setShow={setShow}
				title='Successfully Deleted'
				text='a record has been deleted from the database'
			/>
		</div>
	);
};

export async function getStaticProps() {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery(['movies'], fetchDirectors);

	return {
		props: { dehydratedState: dehydrate(queryClient) },
	};
}

export default Directors;
