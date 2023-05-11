import { Dispatch, SetStateAction } from 'react'
import { Tabs } from '../app/tabs'

interface AuctionHeaderProps {
	setState: Dispatch<SetStateAction<string>>
	state: string
}

export const AuctionHeader = ({ state, setState }: AuctionHeaderProps) => {
	const tabs = [
		{
			name: state,
			current: true
		}
	]

	return (
		<div>
			<Tabs
				labelText="Auction"
				name="Auction"
				value="Auction"
				setShowTab={setState}
				tabs={tabs}
				className="w-full text-left text-2xl"
			/>
		</div>
	)
}
