import moment from 'moment'
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
import { Property } from 'src/types/typings'

interface SalesProps {
	data: Property[]
	filterData: {
		fromDate: string
		toDate: string
		period: string
	}
}

interface ChartData {
	[key: string]: {
		year: string
		sales: number
	}
}

export const Sales = ({ data, filterData }: SalesProps) => {
	const groupedData = data.reduce((acc: ChartData, curr) => {
		const year = moment(curr.AddHistory.Date).format('YYYY')
		if (year) {
			if (!acc[year]) {
				acc[year] = { year, sales: 0 }
			}
			acc[year].sales++
		}
		return acc
	}, {})

	const filteredData = Object.values(groupedData).filter(item => {
		const itemYear = item.year

		if (filterData.period === 'period') {
			const fromDate = moment(filterData.fromDate).startOf('year')
			const toDate = moment(filterData.toDate).endOf('year')

			const yearStart = moment(itemYear).startOf('year')
			const yearEnd = moment(itemYear).endOf('year')
			return (
				itemYear >= fromDate.format('YYYY') &&
				itemYear <= toDate.format('YYYY') &&
				fromDate.isSameOrBefore(yearEnd) &&
				toDate.isSameOrAfter(yearStart)
			)
		} else {
			const currentYear = moment().format('YYYY')

			if (filterData.period === 'year' || filterData.period === 'month') {
				return itemYear === currentYear
			} else {
				return false
			}
		}
	})

	const result = Object.values(filteredData.length === 0 ? groupedData : filteredData)

	return (
		<div className="w-full">
			<div className="mt-2 sm:p-4">
				<h2 className="text-2xl text-gray-700 text-center uppercase">Units Sold</h2>
			</div>
			<div className="w-full px-1">
				<SalesChart data={result} />
			</div>
		</div>
	)
}

interface SalesChartProps {
	data: {
		year: string
		sales: number
	}[]
}

const SalesChart = ({ data }: SalesChartProps) => {
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
