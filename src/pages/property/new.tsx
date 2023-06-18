import { useState } from 'react'
import { Container } from 'src/components/app/container'
import { AppHeader } from 'src/components/app/header'
import { AppLayout } from 'src/components/app/layout'
import AddHistoryForm from 'src/components/property/add-history'
import AddPropertyForm from 'src/components/property/add-property'
import { PropertyHeader } from 'src/components/property/header'
import PropertyDetailsForm from 'src/components/property/property-details'

const newProperty = () => {
	const [state, setState] = useState('Property Details')
	const [propertyId, setPropertyId] = useState('')
	const [category, setCategory] = useState<string>('')

	return (
		<AppLayout>
			<AppHeader />
			<Container>
				<PropertyHeader setState={setState} isNew={true} state={state} />
				{state === 'Add Property' && <AddPropertyForm setCategory={setCategory} setId={setPropertyId} setCurrentTab={setState} />}
				{state === 'Property Details' && <PropertyDetailsForm category={category} propertyId={propertyId} setCurrentTab={setState} />}
				{state === 'Add History' && <AddHistoryForm propertyId={propertyId} />}
			</Container>
		</AppLayout>
	)
}

export default newProperty
