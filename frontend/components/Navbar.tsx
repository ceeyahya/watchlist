import { Fragment, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useUser } from '@auth0/nextjs-auth0';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import {
	RiMenuFill,
	RiCloseFill,
	RiCameraLensFill,
	RiErrorWarningFill,
} from 'react-icons/ri';

import { classNames } from 'utils/classNames';
import { Disclaimer } from './Misc/Disclaimer';

const navigation = [
	{ name: 'Statistics', href: '/' },
	{ name: 'Movies', href: '/movies' },
	{ name: 'Directors', href: '/directors' },
];

export const Navbar = () => {
	const { user } = useUser();
	const [show, setShow] = useState(false);

	return (
		<div>
			<Disclosure as='nav' className=''>
				{({ open }) => (
					<>
						<div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
							<div className='relative flex items-center justify-between h-16'>
								<div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
									<Disclosure.Button className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
										<span className='sr-only'>Open main menu</span>
										{open ? (
											<RiCloseFill
												className='block h-6 w-6'
												aria-hidden='true'
											/>
										) : (
											<RiMenuFill
												className='block h-6 w-6'
												aria-hidden='true'
											/>
										)}
									</Disclosure.Button>
								</div>
								<div className='flex-1 flex items-center justify-center sm:justify-start'>
									<div className='flex-shrink-0 flex items-center'>
										<Link href='/'>
											<a>
												<RiCameraLensFill className='block lg:hidden hover:rotate-45 hover:h-7 transition duration-300 h-6 w-auto' />
											</a>
										</Link>
										<Link href='/'>
											<a>
												<RiCameraLensFill className='hidden hover:rotate-45 hover:h-7 transition duration-300 lg:block h-6 w-auto' />
											</a>
										</Link>
									</div>
									<div className='hidden sm:block sm:ml-6'>
										<div className='flex space-x-4'>
											{navigation.map((item) => (
												<Link key={item.name} href={item.href}>
													<a
														href={item.href}
														className='block text-gray-400 hover:text-black text-sm font-medium transition duration-300'>
														{item.name}
													</a>
												</Link>
											))}
										</div>
									</div>
								</div>
								<div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
									{user ? (
										<Menu as='div' className='ml-3 relative'>
											<div>
												<Menu.Button className='bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
													<span className='sr-only'>Open user menu</span>
													<Image
														width={12}
														height={12}
														className='rounded-full'
														src={user?.picture || ''}
														alt={`${user?.name} Profile Picture`}
													/>
												</Menu.Button>
											</div>
											<Transition
												as={Fragment}
												enter='transition ease-out duration-100'
												enterFrom='transform opacity-0 scale-95'
												enterTo='transform opacity-100 scale-100'
												leave='transition ease-in duration-75'
												leaveFrom='transform opacity-100 scale-100'
												leaveTo='transform opacity-0 scale-95'>
												<Menu.Items className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
													<Menu.Item>
														{({ active }) => (
															<div>
																<Link href='/admin'>
																	<a
																		className={classNames(
																			active ? 'bg-gray-100' : '',
																			'block px-4 py-2 text-sm text-gray-700'
																		)}>
																		Admin Panel
																	</a>
																</Link>
															</div>
														)}
													</Menu.Item>
													<Menu.Item>
														{({ active }) => (
															<a
																href='/api/auth/logout'
																className={classNames(
																	active ? 'bg-gray-100' : '',
																	'block px-4 py-2 text-sm text-gray-700'
																)}>
																Sign out
															</a>
														)}
													</Menu.Item>
												</Menu.Items>
											</Transition>
										</Menu>
									) : (
										<div className='flex items-center space-x-2 md:space-x-4'>
											<button
												onClick={() => setShow(true)}
												className='px-1 py-1 md:px-2 md:py-2 rounded-full bg-yellow-100 border border-yellow-200'>
												<RiErrorWarningFill
													className='h-6 w-6 text-yellow-600'
													aria-hidden='true'
												/>
											</button>
											<a
												className='bg-black text-white px-4 py-2 rounded-md hover:opacity-75 transition duration-300'
												href='/api/auth/login'>
												Login
											</a>
										</div>
									)}
								</div>
							</div>
						</div>

						<Disclosure.Panel className='sm:hidden px-4'>
							<div className='px-2 pt-2 pb-3 rounded-lg space-y-2 border border-gray-100 shadow-md shadow-gray-200'>
								{navigation.map((item) => (
									<Link key={item.name} href={item.href}>
										<Disclosure.Button
											as='a'
											className='px-2 block cursor-pointer text-gray-600 rounded-md text-base font-medium'>
											{item.name}
										</Disclosure.Button>
									</Link>
								))}
							</div>
						</Disclosure.Panel>
					</>
				)}
			</Disclosure>
			<Disclaimer show={show} setShow={setShow} />
		</div>
	);
};
