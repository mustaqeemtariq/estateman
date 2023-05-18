import { GetServerSidePropsContext } from 'next'
import { Container } from 'src/components/app/container'
import { AppHeader } from 'src/components/app/header'
import { AppLayout } from 'src/components/app/layout'
import { ListHeader } from 'src/components/property/list-header'
import ViewPropertyCard from 'src/components/property/view-card'
import propertyService from 'src/services/property'
import { Property } from 'src/types/typings'

interface ViewPropertyProps {
	propertyData: Property
}

const ViewProperty = ({ propertyData }: ViewPropertyProps) => {
	return (
		<AppLayout>
			<AppHeader />
			<Container>
				<ListHeader heading="View Property" viewButtons={true} />
				<ViewPropertyCard data={propertyData} />
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
