import { UserIcon } from '@heroicons/react/20/solid'
import { Container } from 'src/components/app/container'
import { AppHeader } from 'src/components/app/header'
import { AppLayout } from 'src/components/app/layout'
import { HomeCard } from 'src/components/dashboard/card'
import { Rent } from 'src/components/dashboard/rent'
import { Sales } from 'src/components/dashboard/sales'

export default function Home() {
	return (
		<AppLayout>
			<AppHeader />
			<Container>
				<div className="flex justify-center sm:flex-col xl:flex-row space-y-10 xl:space-y-0 xl:space-x-8 md:space-x-0">
					<Sales />
					<Rent />
				</div>
				<div className="flex justify-between mt-4">
					{[0, 1, 2, 3].map(item => (
						<HomeCard name="Active Users" stats={5} background={UserIcon} />
					))}
				</div>
			</Container>
		</AppLayout>
	)
}
