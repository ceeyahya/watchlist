import React, { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { RiCheckFill, RiArrowDownSFill } from 'react-icons/ri';

import { classNames } from 'utils/classNames';

const people = [
	{
		id: 1,
		name: 'Wade Cooper',
		avatar:
			'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	},
	{
		id: 2,
		name: 'Arlene Mccoy',
		avatar:
			'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	},
	{
		id: 3,
		name: 'Devon Webb',
		avatar:
			'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80',
	},
	{
		id: 4,
		name: 'Tom Cook',
		avatar:
			'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	},
	{
		id: 5,
		name: 'Tanya Fox',
		avatar:
			'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	},
	{
		id: 6,
		name: 'Hellen Schmidt',
		avatar:
			'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	},
	{
		id: 7,
		name: 'Caroline Schultz',
		avatar:
			'https://images.unsplash.com/photo-1568409938619-12e139227838?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	},
	{
		id: 8,
		name: 'Mason Heaney',
		avatar:
			'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	},
	{
		id: 9,
		name: 'Claudie Smitham',
		avatar:
			'https://images.unsplash.com/photo-1584486520270-19eca1efcce5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	},
	{
		id: 10,
		name: 'Emil Schaefer',
		avatar:
			'https://images.unsplash.com/photo-1561505457-3bcad021f8ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	},
];

export const AddMovie = () => {
	const [selected, setSelected] = useState(people[1]);

	return (
		<div className='max-w-lg'>
			<form className='space-y-4' action=''>
				<div>
					<label
						htmlFor='title'
						className='block text-sm font-medium text-gray-700'>
						Title
					</label>
					<div className='mt-1'>
						<input
							type='text'
							name='title'
							id='title'
							className='shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md'
							placeholder='Taxi Driver'
						/>
					</div>
				</div>
				<div>
					<label
						htmlFor='releaseYear'
						className='block text-sm font-medium text-gray-700'>
						Release Year
					</label>
					<div className='mt-1'>
						<input
							type='number'
							maxLength={4}
							name='releaseYear'
							id='releaseYear'
							className='shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md'
							placeholder='1976'
						/>
					</div>
				</div>
				<div>
					<label
						htmlFor='synopsis'
						className='block text-sm font-medium text-gray-700'>
						Synopsis
					</label>
					<div className='mt-1'>
						<textarea
							rows={4}
							name='synopsis'
							id='synopsis'
							className='shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md'
							placeholder='Travis Bickle is a New York cabbie that suffers from insomnia ...'
							defaultValue={''}
						/>
					</div>
				</div>
				<div>
					<Listbox value={selected} onChange={setSelected}>
						{({ open }) => (
							<>
								<Listbox.Label className='block text-sm font-medium text-gray-700'>
									Director
								</Listbox.Label>
								<div className='mt-1 relative'>
									<Listbox.Button className='relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 sm:text-sm'>
										<span className='flex items-center'>
											<img
												src={selected.avatar}
												alt=''
												className='flex-shrink-0 h-6 w-6 rounded-full'
											/>
											<span className='ml-3 block truncate'>
												{selected.name}
											</span>
										</span>
										<span className='ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
											<RiArrowDownSFill
												className='h-5 w-5 text-gray-400'
												aria-hidden='true'
											/>
										</span>
									</Listbox.Button>

									<Transition
										show={open}
										as={Fragment}
										leave='transition ease-in duration-100'
										leaveFrom='opacity-100'
										leaveTo='opacity-0'>
										<Listbox.Options className='absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'>
											{people.map((person) => (
												<Listbox.Option
													key={person.id}
													className={({ active }) =>
														classNames(
															active ? 'text-black bg-gray-100' : 'text-black',
															'cursor-default select-none relative py-2 pl-3 pr-9'
														)
													}
													value={person}>
													{({ selected, active }) => (
														<>
															<div className='flex items-center'>
																<img
																	src={person.avatar}
																	alt=''
																	className='flex-shrink-0 h-6 w-6 rounded-full'
																/>
																<span
																	className={classNames(
																		selected ? 'font-semibold' : 'font-normal',
																		'ml-3 block truncate'
																	)}>
																	{person.name}
																</span>
															</div>

															{selected ? (
																<span
																	className={classNames(
																		active ? 'text-white' : 'text-black-600',
																		'absolute inset-y-0 right-0 flex items-center pr-4'
																	)}>
																	<RiCheckFill
																		className='h-5 w-5'
																		aria-hidden='true'
																	/>
																</span>
															) : null}
														</>
													)}
												</Listbox.Option>
											))}
										</Listbox.Options>
									</Transition>
								</div>
							</>
						)}
					</Listbox>
				</div>
				<div>
					<label
						htmlFor='review'
						className='block text-sm font-medium text-gray-700'>
						Review
					</label>
					<div className='mt-1'>
						<textarea
							rows={4}
							name='review'
							id='review'
							className='shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md'
							placeholder='You should not aspire to be Travis Bickle...'
							defaultValue={''}
						/>
					</div>
				</div>
				<div>
					<div className='relative flex items-start'>
						<div className='flex items-center h-5'>
							<input
								id='seen'
								aria-describedby='candidates-description'
								name='seen'
								type='checkbox'
								className='focus:ring-gray-500 h-4 w-4 text-black border-gray-300 rounded'
							/>
						</div>
						<div className='ml-3 text-sm'>
							<label htmlFor='seen' className='font-medium text-gray-700'>
								Seen{' '}
								<span className='text-gray-400'>
									(Have you seen this movie ?)
								</span>
							</label>
						</div>
					</div>
				</div>
				<div>
					<input
						type='submit'
						value='Add Movie'
						className='bg-black text-white py-1.5 rounded-md w-full cursor-pointer hover:opacity-75 transition duration-300'
					/>
				</div>
			</form>
		</div>
	);
};
