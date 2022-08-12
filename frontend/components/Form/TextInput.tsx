import React from 'react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	name: string;
	label: string;
	register: any;
}

export const TextInput = ({
	name,
	label,
	register,
	...rest
}: TextInputProps) => {
	return (
		<div>
			<label
				htmlFor={name}
				className='first-letter:uppercase block text-sm font-medium text-gray-700'>
				{label}
			</label>
			<div className='mt-1'>
				<input
					name={name}
					id={name}
					className='shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md'
					{...register(name)}
					{...rest}
				/>
			</div>
		</div>
	);
};
