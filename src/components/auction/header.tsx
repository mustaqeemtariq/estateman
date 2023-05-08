import { useState } from 'react'
import { Tabs } from '../app/tabs'

export const AuctionHeader = () => {
	const [showTab, setShowTab] = useState('Auction')

	const tabs = [
		{
			name: 'Add Auction',
			current: showTab == 'Auction' ? true : false
		}
	]

	return (
		<div>
			<Tabs
				labelText="Add Auction"
				name="Auction"
				value="Auction"
				setShowTab={setShowTab}
				tabs={tabs}
				className="w-full text-left text-2xl"
			/>
		</div>
	)
}
