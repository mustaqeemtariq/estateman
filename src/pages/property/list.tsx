import { useEffect, useState } from 'react'
import cardImage from 'src/assets/card/pexels-binyamin-mellish-1500459 1.png'
import { Container } from 'src/components/app/container'
import { AppFilter } from 'src/components/app/filter'
import { AppHeader } from 'src/components/app/header'
import { AppLayout } from 'src/components/app/layout'
import PropertyBoxCard from 'src/components/property/box-card'
import { PropertyListCard } from 'src/components/property/list-card'
import { ListHeader } from 'src/components/property/list-header'
import propertyService from 'src/services/property'
import { FilterParameter, ImagePath, Property } from 'src/types/typings'
import { ApplyPropertyFilter } from 'src/utils/filter'
import emptyImage from 'src/assets/card/building.jpg'
import { useRouter } from 'next/router'

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

	const router = useRouter()
	const {search} = router.query

	const [filterParams, setFilterParams] = useState<FilterParameter>({
		period: 'newest',
		city: '',
		type: '',
		category: '',
		contract: ''
	})

	if (typeof search === 'string') {
		propertiesData = propertiesData.filter(data => data.Title?.includes(search))
	}

	const [view, setView] = useState('box')
	const [data, setData] = useState(propertiesData.reverse())	

	useEffect(() => {
		const filteredData = ApplyPropertyFilter(filterParams, propertiesData)
		setData(filteredData)
	}, [filterParams])

	return (
		<AppLayout>
			<AppHeader />
			<Container>
				<ListHeader heading="All Properties" count={data.length} setView={setView} />
				<AppFilter count={data.length} showContract={true} setFilterData={setFilterParams} />
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
					id={item._id}
					image={item.PropertyDetails.imagePath?.[0] ?? emptyImage}
					contract={item.ContractType}
					title={item.Title}
					location={item.Location}
					category={item.PropertyCategory}
					occupancy={item.AddHistory?.OccupancyStatus}
					expiryDate={item.AddHistory?.LeaseExpiringOn}
				/>
			))}
		</div>
	)
}

const ListView = ({ data }: ViewProps) => <PropertyListCard data={data} />

export const getServerSideProps = async () => {
	const response = await propertyService.getAllProperties()

	return {
		props: {
			propertiesData: response || []
		}
	}
}

export default PropertyList
