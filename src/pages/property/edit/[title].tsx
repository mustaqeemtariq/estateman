import { GetServerSidePropsContext } from 'next'
import { useState } from 'react'
import { Container } from 'src/components/app/container'
import { AppHeader } from 'src/components/app/header'
import { AppLayout } from 'src/components/app/layout'
import PropertyForm from 'src/components/property/form'
import { PropertyHeader } from 'src/components/property/header'
import propertyService from 'src/services/property'
import { Property } from 'src/types/typings'

interface UpdatePropertyProps {
	propertyData: Property
}

const UpdateProperty = ({ propertyData }: UpdatePropertyProps) => {
	const [state, setState] = useState('Add Property')
	const [active, setActive] = useState({
		propertyDetails: true,
		addHistory: true,
		allHistory: true
	})

	return (
		<AppLayout>
			<AppHeader />
			<Container>
				<PropertyHeader showHistory={true} setState={setState} active={active} state={state} />
				<PropertyForm
					data={propertyData}
					currentTab={state}
					setCurrentTab={setState}
					setActive={setActive}
				/>
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
