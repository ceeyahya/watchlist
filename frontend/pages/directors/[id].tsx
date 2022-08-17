import { useQuery } from '@tanstack/react-query';
import { fetchDirectors } from 'lib/directors';
import { NextPage, GetServerSidePropsContext } from 'next';
import { RiLoader4Fill } from 'react-icons/ri';
import { Director } from 'types/Director';

const Director: NextPage<{ director: Director }> = ({ director }) => {
	const { isLoading, isError, error, data } = useQuery(
		['movie'],
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
			<img src={director?.avatar} alt='' />
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
