import { Container } from 'src/components/app/container'
import { AppHeader } from 'src/components/app/header'
import { AppLayout } from 'src/components/app/layout'
import AuctionForm from 'src/components/auction/form'
import { AuctionHeader } from 'src/components/auction/header'

const newProperty = () => {
	return (
		<AppLayout>
			<AppHeader />
			<Container>
				<AuctionHeader />
				<AuctionForm />
			</Container>
		</AppLayout>
	)
}

export default newProperty
