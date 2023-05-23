import { ChevronLeftIcon, PlusIcon } from '@heroicons/react/20/solid'
import { Bars2Icon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useState } from 'react'
import { BiCheckbox } from 'react-icons/bi'
import { useAppSelector } from 'src/hooks/rtk'
import { Button } from '../app/button'
import { Tabs } from '../app/tabs'

interface ListHeaderProps {
	count?: number
	title?: string
	heading: string
	setView?: Dispatch<SetStateAction<string>>
	viewButtons?: boolean
}

export const ListHeader = ({ title, heading, count, setView, viewButtons }: ListHeaderProps) => {
	const { Roles } = useAppSelector(state => state.auth)

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
					<div className={clsx('space-x-1 flex', Roles === 'surveyor' && 'hidden')}>
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
					{heading !== 'Auction Details' && (
						<Button
							className="bg-black text-white uppercase flex items-center space-x-2"
							onClick={() => router.push(`/property/edit/?title=${title}&tab=Add History`)}>
							<PlusIcon className="h-5 w-5" aria-hidden="true" />
							<span className="whitespace-nowrap">Add History</span>
						</Button>
					)}
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
