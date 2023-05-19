import { useState } from 'react'
import { Container } from 'src/components/app/container'
import { AppHeader } from 'src/components/app/header'
import { AppLayout } from 'src/components/app/layout'
import PropertyForm from 'src/components/property/form'
import { PropertyHeader } from 'src/components/property/header'

const newProperty = () => {
	const [state, setState] = useState('Add Property')
	const [active, setActive] = useState({
		propertyDetails: false,
		addHistory: false,
		allHistory: false
	})

	return (
		<AppLayout>
			<AppHeader />
			<Container>
				<PropertyHeader setState={setState} active={active} state={state} />
				<PropertyForm
					isNew={true}
					currentTab={state}
					setCurrentTab={setState}
					setActive={setActive}
				/>
			</Container>
		</AppLayout>
	)
}

export default newProperty
