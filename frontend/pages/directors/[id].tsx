import axios from 'axios';
import { NextPage, GetServerSidePropsContext } from 'next';
import { Director } from 'types/Director';

const Movie: NextPage<{ director: Director }> = ({ director }) => {
	return (
		<div>
			<img src={director?.avatar} alt='' />
			<h1>{director.fullname}</h1>
			<p>{director.nationality}</p>
		</div>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const res = await axios.get('http://127.0.0.1:3000/directors');
	const directors = await res?.data;
	const directorId = context.query.id;

	const [director] = directors.filter(
		(director: Director) => director?.id.toString() === directorId
	);

	return {
		props: { director },
	};
}

export default Movie;
