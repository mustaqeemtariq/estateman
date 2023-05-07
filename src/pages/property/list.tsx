import cardImage from 'src/assets/card/pexels-binyamin-mellish-1500459 1.png'
import { Container } from 'src/components/app/container'
import { AppHeader } from 'src/components/app/header'
import { AppLayout } from 'src/components/app/layout'
import { Select } from 'src/components/app/select'
import PropertyCard from 'src/components/property/card'
import { ListHeader } from 'src/components/property/list-header'

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

function PropertyList() {
	return (
		<AppLayout>
			<AppHeader />
			<Container>
				<ListHeader count={listData.length} />
				<div className="flex space-x-2 mb-4">
					<Select name="period">
						<option value="newest">Newest</option>
						<option value="oldest">Oldest</option>
					</Select>
					<Select name="city">
						<option value="">City</option>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
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
					{listData.map(item => (
						<PropertyCard
							image={item.image}
							contract={item.contract}
							title={item.title}
							location={item.location}
							category={item.category}
							occupancy={item.occupancy}
						/>
					))}
				</div>
			</Container>
		</AppLayout>
	)
}

export default PropertyList
