import { useEffect, useState } from 'react'
import cardImage from 'src/assets/card/pexels-binyamin-mellish-1500459 1.png'
import { Container } from 'src/components/app/container'
import { AppFilter } from 'src/components/app/filter'
import { AppHeader } from 'src/components/app/header'
import { AppLayout } from 'src/components/app/layout'
import PropertyBoxCard from 'src/components/property/box-card'
import { PropertyListCard } from 'src/components/property/list-card'
import { ListHeader } from 'src/components/property/list-header'
import imageService from 'src/services/images'
import propertyService from 'src/services/property'
import { FilterParameter, ImagePath, Property } from 'src/types/typings'
import { ApplyPropertyFilter } from 'src/utils/filter'
import EmptyImage from 'src/assets/card/building.jpg'
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
	leasePropertiesData: Property[]
}

const LeasePropertyList = ({ leasePropertiesData }: PropertyListProps) => {
	const [filterParams, setFilterParams] = useState<FilterParameter>({
		period: 'newest',
		city: '',
		type: '',
		category: '',
		contract: ''
	})

	const [view, setView] = useState('box')
	const [data, setData] = useState(leasePropertiesData.reverse())

	const router = useRouter()
	const {search} = router.query

	if (typeof search === 'string') {
		leasePropertiesData = leasePropertiesData.filter(data => data.Title?.includes(search))
	}

	useEffect(() => {
		const filteredData = ApplyPropertyFilter(filterParams, leasePropertiesData)
		setData(filteredData)
	}, [filterParams])

	return (
		<AppLayout>
			<AppHeader />
			<Container>
				<ListHeader heading="On Lease (Rental)" count={data.length} setView={setView} />
				<AppFilter showStatus={true} setFilterData={setFilterParams} />
				{view === 'box' ? <BoxView data={data} /> : <ListView data={data} />}
			</Container>
		</AppLayout>
	)
}

interface ViewProps {
	data: Property[]
}

const BoxView = ({ data }: ViewProps) => {
	const [images, setImages] = useState<ImagePath>()

	useEffect(() => {
		const getImages = async () => {
			const response = await imageService.getPropertyImages('64649dcec2f9388d7c103db6')
			setImages(response)
		}
		getImages()
	}, [])
	return (
		<div className="grid grid-cols-3 gap-x-4 gap-y-3">
			{data.map((item, index) => (
				<PropertyBoxCard
					id={item._id}
					key={item.Title + index}
					image={item?.PropertyDetails?.imagePath?.[0] ?? EmptyImage}
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
	const response = await propertyService.getPropertyByContract('Rent')

	return {
		props: {
			leasePropertiesData: response || []
		}
	}
}

export default LeasePropertyList
