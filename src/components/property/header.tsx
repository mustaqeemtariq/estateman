import { Dispatch, SetStateAction } from 'react'
import { Tab, Tabs } from '../app/tabs'

interface PropertyHeaderProps {
	active: {
		propertyDetails: boolean
		addHistory: boolean
		allHistory: boolean
	}
	setState: Dispatch<SetStateAction<string>>
	state: string
	showHistory?: boolean
}

export const PropertyHeader = ({
	state,
	setState,
	active,
	showHistory = false
}: PropertyHeaderProps) => {
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
		},
		showHistory && {
			name: 'All History',
			current: state === 'All History' ? true : false
		}
	].filter(Boolean) as Tab[]

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
