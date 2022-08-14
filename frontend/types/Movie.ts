import { Director } from './Director';

export type Movie = {
	id: number;
	title: string;
	releaseYear: string;
	review: string;
	synopsis: string;
	status: boolean;
	directorId: number;
	cover: string;
	director: Director;
};

export type Movies = Array<Movie>;
