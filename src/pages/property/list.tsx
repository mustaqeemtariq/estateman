import clsx from 'clsx'
import { useEffect, useState } from 'react'
import cardImage from 'src/assets/card/pexels-binyamin-mellish-1500459 1.png'
import { Container } from 'src/components/app/container'
import { AppFilter } from 'src/components/app/filter'
import { AppHeader } from 'src/components/app/header'
import { AppLayout } from 'src/components/app/layout'
import { Table } from 'src/components/app/table'
import PropertyBoxCard from 'src/components/property/box-card'
import { ListHeader } from 'src/components/property/list-header'
import propertyService from 'src/services/property'
import { FilterParameter, Property } from 'src/types/typings'
import { ApplyFilter } from 'src/utils/filter'

const listData = [
	{
		image: cardImage,
		contract: 'For Sale',
		title: 'Zarai Zameen',
		location: '110 Street 8',
		category: 'House',
		occupancy: 'Sold'
	},
	{
		image: cardImage,
		contract: 'For Sale',
		title: 'Zarai Zameen',
		location: '110 Street 8',
		category: 'House',
		occupancy: 'Sold'
	},
	{
		image: cardImage,
		contract: 'For Sale',
		title: 'Zarai Zameen',
		location: '110 Street 8',
		category: 'House',
		occupancy: 'Sold'
	},
	{
		image: cardImage,
		contract: 'For Sale',
		title: 'Zarai Zameen',
		location: '110 Street 8',
		category: 'House',
		occupancy: 'Sold'
	}
]

interface PropertyListProps {
	propertiesData: Property[]
}

const PropertyList = ({ propertiesData }: PropertyListProps) => {
	const [filterParams, setFilterParams] = useState<FilterParameter>({
		period: 'newest',
		city: '',
		type: '',
		category: '',
		contract: ''
	})

	const [view, setView] = useState('box')
	const [data, setData] = useState(propertiesData)

	useEffect(() => {
		const filteredData = ApplyFilter(filterParams, propertiesData)
		setData(filteredData)
	}, [filterParams])

	return (
		<AppLayout>
			<AppHeader />
			<Container>
				<ListHeader count={data.length} setView={setView} />
				<AppFilter showContract={true} setFilterData={setFilterParams} />
				{view === 'box' ? <BoxView data={data} /> : <ListView data={data} />}
			</Container>
		</AppLayout>
	)
}

interface ViewProps {
	data: Property[]
}

const BoxView = ({ data }: ViewProps) => {
	return (
		<div className="grid grid-cols-3 gap-x-4 gap-y-3">
			{data.map((item, index) => (
				<PropertyBoxCard
					key={item.Title + index}
					image={item.PropertyDetails?.images}
					contract={item.ContractType}
					title={item.Title}
					location={item.Location}
					category={item.PropertyCategory}
					occupancy={item.AddHistory?.OccupancyStatus}
				/>
			))}
		</div>
	)
}

const ListView = ({ data }: ViewProps) => {
	const renderPeopleTBody = (data: Property[]) => {
		return (
			<tbody className="bg-white">
				{data.map((item, index) => (
					<tr
						key={item.Title + index}
						className={clsx(' hover:bg-[#0D0C18]/[85%]', index % 2 === 0 && 'bg-gray-100')}>
						<td className="tw-table-td col-span-2">{item.PropertyDetails?.image}</td>
						<td className="tw-table-td">
							<div className="flex flex-col">
								{item.Title}
								<span className="text-blue-500">{item.Address} 22</span>
							</div>
						</td>
						<td className="tw-table-td">{item.City}</td>
						<td className="tw-table-td">{item.PropertyCategory}</td>
						<td className="tw-table-td">{item.OccupancyStatus}</td>
						<td className="tw-table-td">{item.ContractType}</td>
						<td className="tw-table-td">{item.LeaseExpiringOn}</td>
						<td className="tw-table-td relative">
							<div className="absolute top-4 right-56 z-20 opacity-0 hover:opacity-100 transition-opacity">
								<button className="mx-2 text-black bg-[#FCFDFF] rounded-md px-9 py-2 uppercase">
									View
								</button>
								<button className="mx-2 text-white bg-[#DC4200] rounded-md px-10 py-2 uppercase">
									Edit
								</button>
								<button className="mx-2 text-white bg-[#0038FF] rounded-md px-8 py-2">
									Add History
								</button>
							</div>
						</td>
					</tr>
				))}
			</tbody>
		)
	}

	return (
		<>
			<div className="mt-6 flow-root overflow-hidden rounded-lg">
				<div className="-my-2 -mx-4 overflow-x-auto  sm:-mx-6 lg:-mx-8">
					<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
						<div>
							<Table
								headers={['Property', '', 'City', 'Category', 'Status', 'Contract', 'Expiring On']}
								items={data}
								renderComponent={renderPeopleTBody}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export const getStaticProps = async () => {
	const response = await propertyService.getAllProperties()

	return {
		props: {
			propertiesData: response
		}
	}
}

export default PropertyList
