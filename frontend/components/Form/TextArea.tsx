import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { Movie } from 'types/Movie';

interface TextAreaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	name: string;
	label: string;
	register: UseFormRegister<FieldValues>;
}

export const TextArea = ({ name, label, register, ...rest }: TextAreaProps) => {
	return (
		<div>
			<label
				htmlFor={name}
				className='first-letter:uppercase block text-sm font-medium text-gray-700'>
				{label}
			</label>
			<div className='mt-1'>
				<textarea
					rows={4}
					id={name}
					className='shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md'
					defaultValue={''}
					{...register(name)}
					{...rest}
				/>
			</div>
		</div>
	);
};
