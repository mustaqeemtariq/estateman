import { Container } from 'src/components/app/container'
import { AppHeader } from 'src/components/app/header'
import { AppLayout } from 'src/components/app/layout'
import PropertyForm from 'src/components/property/add-form'
import { PropertyHeader } from 'src/components/property/header'

const newProperty = () => {
	return (
		<AppLayout>
			<AppHeader />
			<Container>
				<PropertyHeader />
				<PropertyForm />
			</Container>
		</AppLayout>
	)
}

export default newProperty
