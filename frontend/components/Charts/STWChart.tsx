import {
	Bar,
	BarChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';

import { StatElement } from 'types/Chart';

export const STWChart = ({ data }: { data: Array<StatElement> }) => {
	return (
		<ResponsiveContainer width='100%' height={500}>
			<BarChart
				data={data}
				margin={{ top: 5, right: 20, left: 20, bottom: 80 }}>
				<CartesianGrid vertical={false} strokeDasharray='2 2' />
				<XAxis dataKey='label' interval={0} fontSize={12} dy={10} />
				<YAxis />
				<Tooltip />
				<Bar maxBarSize={20} dataKey='value' fill='#4f46e5' />
			</BarChart>
		</ResponsiveContainer>
	);
};
