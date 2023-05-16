import { GetServerSidePropsContext } from 'next'
import { Container } from 'src/components/app/container'
import { AppHeader } from 'src/components/app/header'
import { AppLayout } from 'src/components/app/layout'
import ViewAuctionCard from 'src/components/auction/view-card'
import { ListHeader } from 'src/components/property/list-header'
import propertyService from 'src/services/property'
import { Property } from 'src/types/typings'

interface ViewPropertyProps {
	propertyData: Property
}

const ViewProperty = ({ propertyData }: ViewPropertyProps) => {
	console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY)

	return (
		<AppLayout>
			<AppHeader />
			<Container>
				<ListHeader heading="View Property" viewButtons={true} />
				<ViewAuctionCard />
			</Container>
		</AppLayout>
	)
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
	const { title } = ctx.query
	const response = await propertyService.searchProperty(typeof title == 'string' ? title : '')
	return {
		props: {
			propertyData: response
		}
	}
}

export default ViewProperty
