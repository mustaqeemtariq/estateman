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
	soldPropertiesData: Property[]
}

const SoldPropertyList = ({ soldPropertiesData }: PropertyListProps) => {
	const [filterParams, setFilterParams] = useState<FilterParameter>({
		period: 'newest',
		city: '',
		type: '',
		category: '',
		contract: ''
	})

	const [view, setView] = useState('box')
	const [data, setData] = useState(soldPropertiesData)

	useEffect(() => {
		const filteredData = ApplyPropertyFilter(filterParams, soldPropertiesData)
		setData(filteredData)
	}, [filterParams])

	return (
		<AppLayout>
			<AppHeader />
			<Container>
				<ListHeader heading="On Sale" count={data.length} setView={setView} />
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
					image={images?.propertyDetails?.[index]}
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
	const response = await propertyService.getPropertyByContract('Sale')

	return {
		props: {
			soldPropertiesData: response
		}
	}
}

export default SoldPropertyList
