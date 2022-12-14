import { Control, Controller, FieldValue, FieldValues } from 'react-hook-form';
import { Movie } from 'types/Movie';

export function RadioButtons({
	control,
	name,
}: {
	control: Control<Movie>;
	name: any;
}) {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { onChange, onBlur, value, ref } }) => (
				<div className='flex items-center space-x-4'>
					<label className='flex items-center space-x-1'>
						<input
							className='focus:ring-gray-500 h-4 w-4 text-black border-gray-300'
							type='radio'
							onBlur={onBlur}
							onChange={() => onChange(true)}
							checked={value === true}
							data-inputRef={ref}
						/>
						<p className='ml-1 block text-sm font-medium text-gray-700'>Seen</p>
					</label>
					<label className='flex items-center space-x-1'>
						<input
							className='focus:ring-gray-500 h-4 w-4 text-black border-gray-300'
							type='radio'
							onBlur={onBlur}
							onChange={() => onChange(false)}
							checked={value === false}
							data-inputRef={ref}
						/>
						<p className='ml-1 block text-sm font-medium text-gray-700'>
							Watchlist
						</p>
					</label>
				</div>
			)}
		/>
	);
}
