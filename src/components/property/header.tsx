import { useState } from 'react'
import { Tabs } from '../app/tabs'

export const PropertyHeader = () => {
	const [showTab, setShowTab] = useState('Add Property')

	const tabs = [
		{
			name: 'Add Property',
			current: showTab == 'Add Property' ? true : false
		},
		{
			name: 'Property Details',
			current: showTab == 'Property Details' ? true : false
		},
		{
			name: 'Add History',
			current: showTab == 'Add History' ? true : false
		}
	]

	return (
		<div className="flex justify-between items-center mb-4">
			<Tabs
				labelText="Property"
				name="property"
				value="property"
				setShowTab={setShowTab}
				tabs={tabs}
				className="text-2xl"
			/>
		</div>
	)
}
