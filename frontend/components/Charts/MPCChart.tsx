import {
	ResponsiveContainer,
	BarChart,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	ReferenceLine,
	Bar,
} from 'recharts';
import { StatElement } from 'types/Chart';

export const MPCChart = ({ data }: { data: Array<StatElement> }) => {
	const hmn = Math.max(...data.map((d: any) => d.value));
	return (
		<ResponsiveContainer width='100%' height={500}>
			<BarChart
				data={data}
				margin={{ top: 5, right: 20, left: 20, bottom: 80 }}>
				<CartesianGrid vertical={false} strokeDasharray='4 4' />
				<XAxis
					dataKey='label'
					interval={0}
					fontSize={10}
					angle={-90}
					dy={50}
					dx={-5}
				/>
				<YAxis tickCount={7} />
				<Tooltip />
				<ReferenceLine
					y={hmn}
					label={{
						value: `Highest Movie Count per Country: ${hmn}`,
						position: 'top',
						dy: -2,
						fontSize: 12,
						fontWeight: 500,
						fill: '#ef4444',
					}}
					stroke='#ef4444'
					strokeDasharray='3 2'
				/>
				<Bar dataKey='value' fill='#4f46e5' />
			</BarChart>
		</ResponsiveContainer>
	);
};
