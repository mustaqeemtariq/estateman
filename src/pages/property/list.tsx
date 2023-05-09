import cardImage from 'src/assets/card/pexels-binyamin-mellish-1500459 1.png'
import { Container } from 'src/components/app/container'
import { AppHeader } from 'src/components/app/header'
import { AppLayout } from 'src/components/app/layout'
import { Select } from 'src/components/app/select'
import PropertyCard from 'src/components/property/card'
import { ListHeader } from 'src/components/property/list-header'
import { CityNames } from 'src/constants/constants'
import propertyService from 'src/services/property'
import { Property } from 'src/types/typings'

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

function PropertyList({ propertiesData }: PropertyListProps) {

	return (
		<AppLayout>
			<AppHeader />
			<Container>
				<ListHeader count={propertiesData.length} />
				<div className="flex space-x-2 mb-4">
					<Select name="period">
						<option value="newest">Newest</option>
						<option value="oldest">Oldest</option>
					</Select>
					<Select name="city">
						<option value="">City</option>
						{Object.values(CityNames).map(unit => (
							<option key={unit} value={unit}>
								{unit}
							</option>
						))}
					</Select>
					<Select name="type">
						<option value="">Type</option>
						<option value="residential">Residential</option>
						<option value="commercial">Commercial</option>
					</Select>
					<Select name="category">
						<option value="house">House</option>
						<option value="penthouse">PentHouse</option>
						<option value="apartment">Apartment</option>
						<option value="studio">Studio</option>
						<option value="villa">Villa</option>
						<option value="plot">Plot</option>
						<option value="land">Agricultural Land</option>
					</Select>
					<Select name="contract">
						<option value="">Contract</option>
						<option value="rent">For Rent</option>
						<option value="sale">For Sale</option>
					</Select>
				</div>
				<div className="grid grid-cols-3 gap-x-4 gap-y-3">
					{propertiesData.map((item, index) => (
						<PropertyCard
							key={item.Title + index}
							image={item.PropertyDetails?.images}
							contract={item.ContractType}
							title={item.Title}
							location={item.Location}
							category={item.PropertyCategory}
							occupancy={item.AddHistory.OccupancyStatus ?? ''}
						/>
					))}
				</div>
			</Container>
		</AppLayout>
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
