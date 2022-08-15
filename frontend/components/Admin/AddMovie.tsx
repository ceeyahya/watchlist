import { useState } from 'react';
import axios from 'axios';
import {
	SubmitHandler,
	useForm,
	Controller,
	FieldValues,
} from 'react-hook-form';

import { TextInput } from 'components/Form/TextInput';
import { TextArea } from 'components/Form/TextArea';
import { Notification } from 'components/Misc/Notification';
import { Director, Directors } from 'types/Director';
import { Movie } from 'types/Movie';
import { RadioButtons } from 'components/Form/RadioButtons';

export const AddMovie = ({ directors }: { directors: Directors }) => {
	const [show, setShow] = useState(false);
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<FieldValues | Movie>();

	const onSubmit: SubmitHandler<FieldValues | Movie> = async (data) => {
		const formData = new FormData();

		formData.append('file', data.cover[0]);
		formData.append(
			'upload_preset',
			process.env.NEXT_PUBLIC_CLOUDINARY_PRESET!
		);
		formData.append(
			'cloud_name',
			process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME!
		);

		await axios
			.post(
				`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME}/image/upload`,
				formData
			)
			.then((resp) =>
				axios.post('http://127.0.0.1:3000/movie', {
					title: data.title,
					releaseYear: data.releaseYear,
					synopsis: data.synopsis,
					status: data.status,
					review: data.review,
					cover: resp.data.secure_url,
					directorId: parseInt(data.directorId),
				})
			)
			.then((resp) => setShow(true))
			.catch((err) => console.log(err));
	};

	return (
		<div className='max-w-lg'>
			<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-y-0 gap-x-4'>
					<TextInput
						register={register}
						name='title'
						label='Title'
						placeholder='Taxi Driver'
						type='text'
					/>

					<TextInput
						register={register}
						name='releaseYear'
						label='Release Year'
						placeholder='1974'
						type='number'
						maxLength={4}
					/>
				</div>

				<TextArea
					register={register}
					name='synopsis'
					label='Synopsis'
					placeholder='Travis Bickle is a New York cabbie that suffers from insomnia ...'
				/>

				<div>
					<label
						htmlFor='director'
						className='block text-sm font-medium text-gray-700'>
						Director
					</label>
					<select
						id='directorId'
						className='mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md'
						{...register('directorId')}
						defaultValue={directors[0]?.id}>
						{directors.map((director: Director) => (
							<option key={director?.fullname} value={director?.id}>
								{director?.fullname}
							</option>
						))}
					</select>
				</div>

				<TextArea
					register={register}
					name='review'
					label='Review'
					placeholder='You should not aspire to be Travis Bickle...'
				/>

				<div>
					<RadioButtons control={control} name='status' />
				</div>

				<div>
					<input
						className='block w-64 file:appearance-none file:rounded-md text-gray-500 file:border-0 file:mr-4 file:px-4 file:py-2 file:bg-gray-200 file:shadow-sm file:shadow-gray-200'
						type='file'
						id='cover'
						{...register('cover')}
					/>
				</div>

				<div>
					<input
						type='submit'
						value='Add Movie'
						className='bg-black text-white py-1.5 rounded-md w-full cursor-pointer hover:opacity-75 transition duration-300'
					/>
				</div>
			</form>
			<Notification
				show={show}
				setShow={setShow}
				title='Successfully Added'
				text='a new record has been saved in the database'
			/>
		</div>
	);
};
