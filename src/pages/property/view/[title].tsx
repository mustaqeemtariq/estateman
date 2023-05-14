import { GetServerSidePropsContext } from 'next'
import { Container } from 'src/components/app/container'
import { AppHeader } from 'src/components/app/header'
import { AppLayout } from 'src/components/app/layout'
import { ListHeader } from 'src/components/property/list-header'
import ViewCard from 'src/components/property/view-card'
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
				<ViewCard />
			</Container>
		</AppLayout>
	)
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
	const { title } = ctx.query
	console.log('DZS', title)

	const response = await propertyService.searchProperty(typeof title == 'string' ? title : '')
	return {
		props: {
			propertyData: response
		}
	}
}

export default ViewProperty
