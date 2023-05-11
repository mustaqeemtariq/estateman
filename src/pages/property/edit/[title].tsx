import { GetServerSidePropsContext } from 'next'
import { useState } from 'react'
import { Container } from 'src/components/app/container'
import { AppHeader } from 'src/components/app/header'
import { AppLayout } from 'src/components/app/layout'
import PropertyForm from 'src/components/property/form'
import { PropertyHeader } from 'src/components/property/header'
import propertyService from 'src/services/property'

const UpdateProperty = () => {
	const [state, setState] = useState('Add Property')
	const [active, setActive] = useState({
		propertyDetails: false,
		addHistory: false
	})

	return (
		<AppLayout>
			<AppHeader />
			<Container>
				<PropertyHeader setState={setState} active={active} state={state} />
				<PropertyForm currentTab={state} setCurrentTab={setState} setActive={setActive} />
			</Container>
		</AppLayout>
	)
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
	const { title } = ctx.query
	const response = await propertyService.searchProperty(typeof title == 'string' ? title : '')
	return {
		props: {
			property: response
		}
	}
}

export default UpdateProperty
