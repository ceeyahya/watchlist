export type StatisticsPage = {
	movies: number;
	directors: number;
	countries: number;
	mpc: Array<{ label: string; value: number }>;
	stw: Array<{ label: string; value: number }>;
};

export type StatElement = {
	label: string;
	value: number;
};
