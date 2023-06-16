import { ChevronLeftIcon, PlusIcon } from '@heroicons/react/20/solid'
import { Bars2Icon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useState } from 'react'
import { BiCheckbox } from 'react-icons/bi'
import { useAppSelector } from 'src/hooks/rtk'
import { Button } from '../app/button'
import { Tabs } from '../app/tabs'
import ImportHistoryButton from './import-history-button'
import { toast } from 'react-hot-toast'
import propertyService from 'src/services/property'

interface ListHeaderProps {
	count?: number
	title?: string
	id: string
	heading: string
	setView?: Dispatch<SetStateAction<string>>
	viewButtons?: boolean
}

export const ListHeader = ({
	id,
	title,
	heading,
	count,
	setView,
	viewButtons
}: ListHeaderProps) => {
	const { Roles } = useAppSelector(state => state.auth)

	const [showTab, setShowTab] = useState(heading)
	const router = useRouter()

	const tabs = [
		{
			name: heading,
			current: showTab == heading ? true : false
		}
	]

	const uploadHistoryFile = async (historyData: FormData, id: string) => {
		const response = await propertyService.uploadHistoryFile(historyData, id)
		if (response.success) {
			toast.success('History File Uploaded Successfully')
			router.push('/property/history')
		} else {
			toast.error(response.message)
		}
	}

	const handleHistoryUpload = (file: File) => {
		const historyFormData = new FormData()
		historyFormData.append('history', file)
		console.log('ID', id)

		uploadHistoryFile(historyFormData, id)
	}

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
				<div className="relative flex space-x-5">
					<div className='flex flex-col space-y-12 mr-2'>
						
					{heading !== 'Auction Details' && (
						<ImportHistoryButton onHistoryUpload={handleHistoryUpload} />
					)}
					</div>
					<div className="absolute right-[122px] -top-6 text-right text-green-500 mb-4">
					<a className="whitespace-nowrap" href="/sample/History.xlsx" target="_blank" download>
						View History Sheet
					</a>
				</div>
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
