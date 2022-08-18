import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { RiLoader4Fill } from 'react-icons/ri';
import { NextPage, GetServerSidePropsContext } from 'next';

import { Director } from 'types/Director';
import { fetchDirectors } from 'lib/directors';

const Director: NextPage<{ director: Director }> = ({ director }) => {
	const { isLoading, isError, error, data } = useQuery(
		['director'],
		fetchDirectors,
		{
			initialData: director,
		}
	);

	if (isLoading) {
		return (
			<div className='fixed inset-0 h-screen'>
				<RiLoader4Fill className='h-6 w-6 animate-spin-slow' />
			</div>
		);
	}

	return (
		<div>
			<Image
				loading='eager'
				blurDataURL={director?.avatar}
				objectFit='cover'
				placeholder='blur'
				layout='intrinsic'
				className='shadow-md shadow-gray-200 rounded-md'
				width={217}
				height={314}
				src={director?.avatar || '/covers.png'}
				alt={`${director?.fullname} Avatar`}
			/>
			<h1>{director.fullname}</h1>
			<p>{director.nationality}</p>
		</div>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const res = await fetchDirectors();
	const directorId = context.query.id;

	const [director] = res.filter(
		(director: Director) => director?.id.toString() === directorId
	);

	return {
		props: { director },
	};
}

export default Director;
