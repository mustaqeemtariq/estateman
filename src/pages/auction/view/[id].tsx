import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { Container } from 'src/components/app/container'
import { AppHeader } from 'src/components/app/header'
import { AppLayout } from 'src/components/app/layout'
import ViewAuctionCard from 'src/components/auction/view-card'
import { ListHeader } from 'src/components/property/list-header'
import { useAppSelector } from 'src/hooks/rtk'
import { Auction } from 'src/types/typings'

const ViewAuction = () => {
    const router = useRouter()
    const {id} = router.query

	const auctions = useAppSelector(state => state.db.auctions) 
   
    const selectedAuction = Object.values(auctions).filter((auction: Auction) => auction._id === id?.toString())
    
	return (
		<AppLayout>
			<AppHeader />
			<Container>
				<ListHeader heading="Auction Details" viewButtons={true} />
				<ViewAuctionCard data={selectedAuction} />
			</Container>
		</AppLayout>
	)
}

export default ViewAuction
