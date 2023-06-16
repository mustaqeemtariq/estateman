import { GetServerSidePropsContext } from 'next'
import { Container } from 'src/components/app/container'
import { AppHeader } from 'src/components/app/header'
import { AppLayout } from 'src/components/app/layout'
import { ListHeader } from 'src/components/property/list-header'
import ViewPropertyCard from 'src/components/property/view-card'
import propertyService from 'src/services/property'
import { Property } from 'src/types/typings'
import { useSearchParams } from 'next/navigation';

interface ViewPropertyProps {
	propertyData: Property[]
}

const ViewProperty = ({ propertyData }: ViewPropertyProps) => {

	const searchParam = useSearchParams()
	return (
		<AppLayout>
			<AppHeader />
			<Container>
				<ListHeader id={propertyData[0]._id} title={propertyData[0].Title} heading="View Property" viewButtons={true} />
				<ViewPropertyCard data={propertyData} propertyId={searchParam.get('propertyId')}/>
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
