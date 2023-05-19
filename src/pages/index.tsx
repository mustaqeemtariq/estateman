import { useState } from 'react'
import RentImage from 'src/assets/dashboard/Group 84.png'
import UserImage from 'src/assets/dashboard/PeopleFill.png'
import SaleImage from 'src/assets/dashboard/building-fill-lock 1.png'
import LeaseDue from 'src/assets/dashboard/exclamation-triangle-fill (1) 1.png'
import { Container } from 'src/components/app/container'
import { AppHeader } from 'src/components/app/header'
import { AppLayout } from 'src/components/app/layout'
import { DashboardCard } from 'src/components/dashboard/card'
import { DashboardHeader } from 'src/components/dashboard/header'
import { Rent } from 'src/components/dashboard/rent'
import { Sales } from 'src/components/dashboard/sales'
import propertyService from 'src/services/property'
import userService from 'src/services/user'
import { Property, User } from 'src/types/typings'

interface HomeProps {
	leaseDue: Property[]
	rent: Property[]
	sale: Property[]
	users: User[]
}

const Home = ({ leaseDue, rent, sale, users }: HomeProps) => {
	const cardData = [
		{ name: 'Active Users', stats: users.length, image: UserImage },
		{ name: 'For Rent', stats: rent.length, image: RentImage },
		{ name: 'For Sale', stats: sale.length, image: SaleImage },
		{ name: 'Lease Due', stats: leaseDue.length, image: LeaseDue }
	]

	const [filterData, setFilterData] = useState({
		fromDate: '',
		toDate: '',
		period: ''
	})

	return (
		<AppLayout>
			<AppHeader />
			<Container>
				<DashboardHeader setData={setFilterData} />
				<div className="flex justify-center sm:flex-col xl:flex-row space-y-10 xl:space-y-0 xl:space-x-8 md:space-x-0">
					<Sales data={sale} filterData={filterData} />
					<Rent data={rent} filterData={filterData} />
				</div>
				<div className="flex justify-between mt-4">
					{cardData.map((item, index) => (
						<DashboardCard
							key={item.name + index}
							name={item.name}
							stats={item.stats}
							background={item.image}
							count={index}
						/>
					))}
				</div>
			</Container>
		</AppLayout>
	)
}

export const getStaticProps = async () => {
	const leaseResponse = await propertyService.leaseDue()
	const rentResponse = await propertyService.getPropertyByContract('Rent')
	const saleResponse = await propertyService.getPropertyByContract('Sale')
	const userResponse = await userService.getAllUsers()
	return {
		props: {
			leaseDue: leaseResponse,
			rent: rentResponse,
			sale: saleResponse,
			users: userResponse
		}
	}
}

export default Home
