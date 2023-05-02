import {
	Area,
	CartesianGrid,
	ComposedChart,
	Line,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis
} from 'recharts'

export const Rent = () => {
	return (
		<div className="w-full">
			<div className="mt-2 sm:p-4">
				<h2 className="text-2xl text-gray-700 text-center uppercase">On Rent</h2>
			</div>
			<div className="w-full px-1">
				<RentChart />
			</div>
		</div>
	)
}

const data = [
	{
		year: 2020,
		sales: 12
	},
	{
		year: 2020.5,
		sales: 29
	},
	{
		year: 2021,
		sales: 50
	},
	{
		year: 2021.5,
		sales: 70
	},
	{
		year: 2022,
		sales: 24
	},
	{
		year: 2022.5,
		sales: 35
	},
	{
		year: 2023,
		sales: 55
	}
]

const RentChart = () => {
	return (
		<div>
			<ResponsiveContainer height={300}>
				<ComposedChart
					width={500}
					height={250}
					data={data}
					margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
					<XAxis
						dataKey="year"
						tickCount={data.length}
						tick={{ fill: 'black', fontWeight: '500' }}
						tickLine={{ display: 'none' }}
					/>
					<YAxis
						dataKey="sales"
						domain={[0, 100]}
						tick={{ fill: 'black', fontWeight: '500' }}
						tickLine={{ display: 'none' }}
					/>
					<CartesianGrid strokeDasharray="3 3" />
					<Tooltip />
					<Area dataKey="sales" fillOpacity={0.2} fill="#0038FF" />
					<Line dataKey="sales" stroke="#0E9CFF" strokeWidth={2} />
				</ComposedChart>
			</ResponsiveContainer>
		</div>
	)
}
