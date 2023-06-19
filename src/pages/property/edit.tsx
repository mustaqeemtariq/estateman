import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Container } from 'src/components/app/container'
import { AppHeader } from 'src/components/app/header'
import { AppLayout } from 'src/components/app/layout'
import AddHistoryForm from 'src/components/property/add-history'
import AddPropertyForm from 'src/components/property/add-property'
import { PropertyHeader } from 'src/components/property/header'
import PropertyDetailsForm from 'src/components/property/property-details'
import propertyService from 'src/services/property'
import { Property } from 'src/types/typings'

interface UpdatePropertyProps {
	propertyData: Property[]
}

const UpdateProperty = ({ propertyData }: UpdatePropertyProps) => {
	const router = useRouter()
	const editData = propertyData[0]
	console.log("edit", editData);
	

	const { tab } = router.query
	const [state, setState] = useState((tab as string) ?? 'Add Property')
	const [propertyId, setPropertyId] = useState('')
	const [category, setCategory] = useState<string>('')

	return (
		<AppLayout>
			<AppHeader />
			<Container>
				<PropertyHeader showHistory={true} setState={setState} isNew={false} state={state} />
				{state === 'Add Property' && <AddPropertyForm setId={setPropertyId} editData={editData} setCategory={setCategory} setCurrentTab={setState} />}
				{state === 'Property Details' && <PropertyDetailsForm propertyId={propertyId} editData={editData} category={category} setCurrentTab={setState} />}
				{state === 'Add History' && <AddHistoryForm editData={editData} propertyId={propertyId} />}
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

export default UpdateProperty
