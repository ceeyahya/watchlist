import { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

import { TextInput } from 'components/Form/TextInput';
import { Notification } from 'components/Misc/Notification';

export const AddDirector = () => {
	const [show, setShow] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data: any) => {
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
				axios.post('http://127.0.0.1:3000/director', {
					fullname: data.fullname,
					nationality: data.nationality,
					avatar: resp.data.secure_url,
				})
			)
			.then((resp) => setShow(true))
			.catch((err) => console.log(err));
	};

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)} className='max-w-lg space-y-4'>
				<TextInput
					label='Full Name'
					name='fullname'
					type='text'
					placeholder='Martin Scorcese'
					register={register}
				/>

				<TextInput
					label='Nationality'
					name='nationality'
					type='text'
					placeholder='US'
					register={register}
				/>

				<div>
					<input
						className='block w-64 file:appearance-none file:rounded-md text-gray-500 file:border-0 file:mr-4 file:px-4 file:py-2 file:bg-gray-200 file:shadow-sm file:shadow-gray-200'
						type='file'
						id='cover'
						{...register('avatar')}
					/>
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
