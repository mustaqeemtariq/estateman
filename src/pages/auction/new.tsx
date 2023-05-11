import { useState } from 'react'
import { Container } from 'src/components/app/container'
import { AppHeader } from 'src/components/app/header'
import { AppLayout } from 'src/components/app/layout'
import AuctionForm from 'src/components/auction/form'
import { AuctionHeader } from 'src/components/auction/header'

const newAuction = () => {
	const [state, setState] = useState('Add Auction')
	return (
		<AppLayout>
			<AppHeader />
			<Container>
				<AuctionHeader state={state} setState={setState} />
				<AuctionForm />
			</Container>
		</AppLayout>
	)
}

export default newAuction
