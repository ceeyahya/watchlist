import React from 'react';

export const AddDirector = () => {
	return (
		<div>
			<form className='max-w-lg space-y-4' action=''>
				<div>
					<label
						htmlFor='fullname'
						className='block text-sm font-medium text-gray-700'>
						Fullname
					</label>
					<div className='mt-1'>
						<input
							type='text'
							name='fullname'
							id='fullname'
							className='shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md'
							placeholder='Martin Scorcese'
						/>
					</div>
				</div>
				<div>
					<label
						htmlFor='nationality'
						className='block text-sm font-medium text-gray-700'>
						Nationality
					</label>
					<div className='mt-1'>
						<input
							type='text'
							name='nationality'
							id='nationality'
							className='shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md'
							placeholder='US'
						/>
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
