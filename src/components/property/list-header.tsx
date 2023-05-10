import { Bars2Icon } from '@heroicons/react/24/outline'
import { Dispatch, SetStateAction, useState } from 'react'
import { BiCheckbox } from 'react-icons/bi'
import { Tabs } from '../app/tabs'

interface ListHeaderProps {
	count: number
	setView: Dispatch<SetStateAction<string>>
}

export const ListHeader = ({ count, setView }: ListHeaderProps) => {
	const [showTab, setShowTab] = useState('All Properties')
	const tabs = [
		{
			name: 'All Properties',
			current: showTab == 'All Properties' ? true : false
		}
	]

	return (
		<div className="flex justify-between items-center mb-4 border-b border-gray-400">
			<Tabs
				labelText="All Properties"
				name="allproperties"
				value="allproperties"
				setShowTab={setShowTab}
				tabs={tabs}
			/>
			<div className="text-[#717B9D] flex space-x-8 text-lg items-center ">
				<div className="space-x-1 flex">
					<h3>{count}</h3>
					<h3>Properties</h3>
				</div>

				<div className="flex space-x-3">
					<Bars2Icon
						className="h-6 w-6 cursor-pointer hover:stroke-black"
						onClick={() => setView('list')}
						aria-hidden="true"
					/>
					<div className="flex cursor-pointer hover:text-black" onClick={() => setView('box')}>
						<BiCheckbox className="h-6 w-6" aria-hidden="true" />
						<BiCheckbox className="h-6 w-6" aria-hidden="true" />
					</div>
				</div>
			</div>
		</div>
	)
}
