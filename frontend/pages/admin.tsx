import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Tab } from '@headlessui/react';

import { classNames } from 'utils/classNames';
import { AddMovie } from 'components/Admin/AddMovie';
import { AddDirector } from 'components/Admin/AddDirector';
import axios from 'axios';
import { Directors } from 'types/Director';

const Movies: NextPage<{ directors: Directors }> = ({ directors }) => {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const { user, error, isLoading } = useUser();

	const tabs = [
		{ name: 'Add Movie', href: '#', current: false },
		{ name: 'Add Director', href: '#', current: true },
	];

	return (
		<div>
			<Head>
				<title>Movies - Watchlist</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main>
				<h1 className='text-2xl font-bold'>Admin Panel</h1>
				<div className='py-4'>
					<div className='block'>
						<nav className='' aria-label='Tabs'>
							<Tab.Group
								selectedIndex={selectedIndex}
								onChange={setSelectedIndex}>
								<Tab.List className='flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4'>
									{tabs.map((tab) => (
										<Tab key={tab.name}>
											{({ selected }) => (
												<div
													className={classNames(
														selected
															? 'bg-gray-200 text-gray-700'
															: 'text-gray-500 hover:text-gray-700',
														'px-3 py-2 font-medium text-sm rounded-md text-left md:text-center'
													)}
													aria-current={tab.current ? 'page' : undefined}>
													{tab.name}
												</div>
											)}
										</Tab>
									))}
								</Tab.List>
								<Tab.Panels className='py-4'>
									<Tab.Panel>
										<AddMovie directors={directors} />
									</Tab.Panel>
									<Tab.Panel>
										<AddDirector />
									</Tab.Panel>
								</Tab.Panels>
							</Tab.Group>
						</nav>
					</div>
				</div>
			</main>
		</div>
	);
};

export async function getServerSideProps() {
	const response = await axios.get(
		'https://watchlist-api.onrender.com/directors'
	);

	return {
		props: {
			directors: response.data,
		},
	};
}

export default withPageAuthRequired(Movies, {
	onRedirecting: () => <h1>Loading</h1>,
	onError: () => <h1>Error</h1>,
});
