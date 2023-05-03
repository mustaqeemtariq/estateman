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

const cardData = [
	{
		name: 'Active Users',
		stats: 5,
		image: UserImage
	},
	{
		name: 'For Rent',
		stats: 20,
		image: RentImage
	},
	{
		name: 'For Sale',
		stats: 21,
		image: SaleImage
	},
	{
		name: 'Lease Due',
		stats: 10,
		image: LeaseDue
	}
]

export default function Home() {
	return (
		<AppLayout>
			<AppHeader />
			<Container>
				<DashboardHeader />
				<div className="flex justify-center sm:flex-col xl:flex-row space-y-10 xl:space-y-0 xl:space-x-8 md:space-x-0">
					<Sales />
					<Rent />
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
