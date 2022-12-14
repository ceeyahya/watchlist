import { useState } from 'react';
import axios from 'axios';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { TextInput } from 'components/Form/TextInput';
import { Notification } from 'components/Misc/Notification';
import { Director } from 'types/Director';

const schema = yup.object().shape({
	fullname: yup.string().required(),
	nationality: yup.string().required(),
	avatar: yup.mixed().required('Avatar is a required field.'),
});

export const AddDirector = () => {
	const [show, setShow] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<Director>({
		resolver: yupResolver(schema),
	});

	const onDirectorSubmit: SubmitHandler<Director> = async (data) => {
		const formData = new FormData();
		formData.append('file', data.avatar[0]);
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
				axios.post('https://watchlist-api.onrender.com/director', {
					fullname: data.fullname,
					nationality: data.nationality,
					avatar: resp.data.secure_url,
				})
			)
			.then((resp) => setShow(true))
			.catch((err) => console.log(err));
		reset();
	};

	return (
		<div>
			<form
				onSubmit={handleSubmit(onDirectorSubmit)}
				className='max-w-lg space-y-4'>
				<div>
					<TextInput
						register={register}
						name='fullname'
						label='Full Name'
						placeholder='Martin Scorcese'
						type='text'
					/>
					<p className='first-letter:uppercase mt-1 text-xs text-red-600'>
						{errors.fullname?.message}
					</p>
				</div>

				<div>
					<TextInput
						register={register}
						name='nationality'
						label='Nationality'
						placeholder='US'
						type='text'
					/>
					<p className='first-letter:uppercase mt-1 text-xs text-red-600'>
						{errors.nationality?.message}
					</p>
				</div>

				<div>
					<input
						className='block w-64 file:appearance-none file:rounded-md text-gray-500 file:border-0 file:mr-4 file:px-4 file:py-2 file:bg-gray-200 file:shadow-sm file:shadow-gray-200'
						type='file'
						id='avatar'
						{...register('avatar')}
					/>
					<p className='first-letter:uppercase mt-1 text-xs text-red-600'>
						{errors.avatar?.message}
					</p>
				</div>

				<div>
					<input
						type='submit'
						value='Add Director'
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
