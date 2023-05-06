import { Dispatch, SetStateAction } from 'react'
import { Tabs } from '../app/tabs'

interface PropertyHeaderProps {
	active: {
		propertyDetails: boolean
		addHistory: boolean
	}
	setState: Dispatch<SetStateAction<string>>
	state: string
}

export const PropertyHeader = ({ state, setState, active }: PropertyHeaderProps) => {
	const tabs = [
		{
			name: 'Add Property',
			current: state == 'Add Property' ? true : false
		},
		{
			name: 'Property Details',
			current: state == 'Property Details' ? true : false
		},
		{
			name: 'Add History',
			current: state == 'Add History' ? true : false
		}
	]

	return (
		<div className="flex justify-between items-center mb-4">
			<Tabs
				labelText="Property"
				name="property"
				value="property"
				active={active}
				setShowTab={setState}
				tabs={tabs}
			/>
		</div>
	)
}
