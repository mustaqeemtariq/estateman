import { ChevronLeftIcon, PlusIcon } from '@heroicons/react/20/solid'
import { Bars2Icon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useState } from 'react'
import { BiCheckbox } from 'react-icons/bi'
import { Button } from '../app/button'
import { Tabs } from '../app/tabs'

interface ListHeaderProps {
	count?: number
	heading: string
	setView?: Dispatch<SetStateAction<string>>
	viewButtons?: boolean
}

export const ListHeader = ({ heading, count, setView, viewButtons }: ListHeaderProps) => {
	const [showTab, setShowTab] = useState(heading)
	const router = useRouter()

	const tabs = [
		{
			name: heading,
			current: showTab == heading ? true : false
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
			{!viewButtons ? (
				<div className="text-[#717B9D] flex space-x-8 text-lg items-center ">
					<div className="space-x-1 flex">
						<h3>{count}</h3>
						<h3>Properties</h3>
					</div>

					<div className="flex space-x-3">
						<Bars2Icon
							className="h-6 w-6 cursor-pointer hover:stroke-black"
							onClick={() => setView?.('list')}
							aria-hidden="true"
						/>
						<div className="flex cursor-pointer hover:text-black" onClick={() => setView?.('box')}>
							<BiCheckbox className="h-6 w-6" aria-hidden="true" />
							<BiCheckbox className="h-6 w-6" aria-hidden="true" />
						</div>
					</div>
				</div>
			) : (
				<div className="flex space-x-5">
					<Button className="bg-black text-white uppercase flex items-center space-x-2">
						<PlusIcon className="h-5 w-5" aria-hidden="true" />
						<span className="whitespace-nowrap">Add History</span>
					</Button>
					<Button
						onClick={() => router.back()}
						className="bg-black text-white uppercase flex items-center space-x-1">
						<ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
						<span>Back</span>
					</Button>
				</div>
			)}
		</div>
	)
}
