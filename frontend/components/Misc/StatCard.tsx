import React from 'react';

export const StatCard = ({
	title,
	stat,
	icon,
}: {
	title: string;
	stat: number;
	icon: React.ReactNode;
}) => {
	return (
		<div className='px-4 py-4 flex items-center space-x-4 bg-white border border-gray-100 shadow-md shadow-gray-200'>
			<div className='p-2 bg-gray-200 rounded-md'>{icon}</div>
			<div>
				<h2 className='text-xs text-gray-500'>{title}</h2>
				<p className='text-xl font-bold'>{stat}</p>
			</div>
		</div>
	);
};
