import { ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import EmptyImage from 'src/assets/card/emptyImage.png'
import Image1 from 'src/assets/card/pexels-binyamin-mellish-1500459 1.png'
import { Container } from 'src/components/app/container'
import { AppHeader } from 'src/components/app/header'
import { ImageSlider } from 'src/components/app/image-slider'
import { AppLayout } from 'src/components/app/layout'
import { Table } from 'src/components/app/table'
import { PropertyHeader } from 'src/components/property/header'
import propertyService from 'src/services/property'
import { Property } from 'src/types/typings'

interface PropertyHistoryProps {
	propertiesHistory: Property[]
}

const PropertyHistory = ({ propertiesHistory }: PropertyHistoryProps) => {
	const [expand, setExpand] = useState<{ [key: string]: boolean }>({})
	const [state, setState] = useState('All History')
	const [active, setActive] = useState({
		propertyDetails: true,
		addHistory: true,
		allHistory: true
	})

	const router = useRouter()

	useEffect(() => {
		if (state !== 'All History') {
			router.push(`/property/edit/?state=${state}`)
		}
	}, [state])

	const renderPeopleTBody = (data: Property[]) => {
		const images = [
			Image1,
			EmptyImage,
			Image1,
			EmptyImage,
			Image1,
			EmptyImage,
			Image1,
			Image1,
			EmptyImage
		]
		return (
			<tbody className="bg-gray-100">
				{data.map((item, index) => (
					<>
						<tr
							onClick={() => setExpand(prev => ({ ...prev, [index]: !prev[index] }))}
							key={index}
							className={clsx('cursor-pointer', !expand[index] && 'border-b-8 border-white')}>
							<td className="tw-table-td col-span-2">
								{moment(item.AddHistory.Date).format('DD MMM, YYYY')}
							</td>
							<td className="tw-table-td w-7/12 pl-0">{item.AddHistory.AddDetails}</td>
							<td className="tw-table-td">{item.AddHistory.OccupancyStatus}</td>
							<td className="tw-table-td">
								<ChevronDownIcon
									className={clsx('h-7 w-7 text-[#717B9D]', expand[index] && 'rotate-180')}
								/>
							</td>
						</tr>
						<tr className={clsx(!expand[index] && 'hidden')}>
							<td></td>
							<td>
								<ImageSlider images={images} type="arrow" />
							</td>
							<td></td>
							<td></td>
						</tr>
						<tr className={clsx(!expand[index] && 'hidden')}>
							<td></td>
							<td className="space-x-2 flex items-center mt-2">
								<div className="border-4 border-blue-400 h-3 w-3 rounded-full text-medium text-medium"></div>
								<p className="text-medium">{item.AddHistory.CallType}Incoming Call Details</p>
							</td>
							<td></td>
							<td></td>
						</tr>
						<tr className={clsx(!expand[index] && 'hidden')}>
							<td></td>
							<td>
								<div className="grid grid-cols-4 gap-x-3 text-gray-500 border-b border-gray-300">
									<p className="text-medium col-span-2">From:</p>
									<p>To:</p>
									<p>On:</p>
								</div>
								<div className="grid grid-cols-4 gap-x-3 mb-6 gap-y-3 mt-3">
									{item?.AddHistory.CallDetails?.map(detail => {
										return (
											<>
												<p className="text-medium text-black">{detail.name}</p>
												<p className="text-medium text-red-500">{detail.from}</p>
												<p className="text-medium">{detail.to}</p>
												<p>{detail.date}</p>
											</>
										)
									})}
								</div>
							</td>
							<td></td>
							<td></td>
						</tr>
						<tr className={clsx(!expand[index] && 'hidden')}>
							<td></td>
							<td>
								<td className="space-x-2 flex items-center">
									<div className="border-4 border-blue-400 h-3 w-3 rounded-full text-medium text-medium"></div>
									<p className="text-medium">Price History</p>
								</td>
							</td>
							<td></td>
							<td></td>
						</tr>
						<tr className={clsx(!expand[index] && 'hidden')}>
							<td></td>
							<td>
								<div className="flex justify-between text-gray-500 border-b border-gray-300 px-2">
									<p>In Year:</p>
									<p>Price(Pkr):</p>
								</div>
								<div className="flex flex-col mb-6 px-2 space-y-2 mt-3">
									{item?.AddHistory.AddPricingHistroy?.map(detail => {
										return (
											<div className="flex justify-between">
												<p className="text-medium text-black">{detail.year}</p>
												<p className="text-medium text-black">{detail.price}</p>
											</div>
										)
									})}
								</div>
							</td>
							<td></td>
							<td></td>
						</tr>
						<tr className={clsx('border-b-8 border-white', !expand[index] && 'hidden')}>
							<td></td>
							<td>
								<div className="flex items-center space-x-2 border-b border-gray-300">
									<div className="border-4 border-blue-400 h-3 w-3 rounded-full" />
									<p className="text-medium">Commission Details</p>
								</div>
								<div className=" text-gray-500 space-y-4 mt-2 px-4 mb-3">
									<div className="flex justify-between">
										<span className="flex space-x-1">
											<p>Pkr.</p>
											<p className="text-black">{item.AddCommision?.Amount}</p>
										</span>
										<span className="flex space-x-1">
											<p>Cheque#</p>
											<p className="text-black">{item.AddCommision?.Cheque}</p>
										</span>
									</div>
									<span className="flex space-x-1">
										<p>Account#</p>
										<p className="text-black">{item.AddCommision?.AccountNumber}</p>
									</span>
									<span className="flex space-x-1">
										<p>Bank Details:</p>
										<p className="text-black">{item.AddCommision?.BankDetails}</p>
									</span>
								</div>
							</td>
							<td></td>
							<td></td>
						</tr>
					</>
				))}
			</tbody>
		)
	}

	return (
		<AppLayout>
			<AppHeader />
			<Container>
				<PropertyHeader showHistory={true} active={active} state={state} setState={setState} />
				<div className="mt-6 flow-root overflow-hidden rounded-lg">
					<div className="-my-2 -mx-4 overflow-x-auto  sm:-mx-6 lg:-mx-8">
						<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
							<div>
								<Table
									headers={['Date', 'Details', 'Status', '']}
									items={propertiesHistory}
									renderComponent={renderPeopleTBody}
								/>
							</div>
						</div>
					</div>
				</div>
			</Container>
		</AppLayout>
	)
}

export const getStaticProps = async () => {
	const response = await propertyService.getHistory()
	return {
		props: {
			propertiesHistory: response
		}
	}
}

export default PropertyHistory
