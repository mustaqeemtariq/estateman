import { ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Container } from 'src/components/app/container'
import { AppHeader } from 'src/components/app/header'
import { ImageSlider } from 'src/components/app/image-slider'
import { AppLayout } from 'src/components/app/layout'
import { Table } from 'src/components/app/table'
import { PropertyHeader } from 'src/components/property/header'
import imageService from 'src/services/images'
import propertyService from 'src/services/property'
import { ImagePath, Property } from 'src/types/typings'

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
			router.push(`/property/edit/?tab=${state}`)
		}
	}, [state])
	

	const renderPeopleTBody = (data: Property[]) => {
		return (
			<tbody className="bg-gray-100">
				{data.reverse().map((item, index) => (
					<>
						<tr
							onClick={() => setExpand(prev => ({ ...prev, [index]: !prev[index] }))}
							key={index}
							className={clsx('cursor-pointer', !expand[index] && 'border-b-8 border-white')}>
							<td className="tw-table-td col-span-2">
								{item?.AddHistory?.Date ? moment(item.AddHistory.Date, "DD MMM, YYYY").format('DD MMM, YYYY') : ""}
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
								<ImageSlider images={item?.AddHistory?.imagePath} type="arrow" />
							</td>
							<td></td>
							<td></td>
						</tr>
						<tr className={clsx(!expand[index] && 'hidden')}>
							<td></td>
							<td className="space-x-2 flex items-center mt-2">
								<div className="border-4 border-blue-400 h-3 w-3 rounded-full text-medium text-medium"></div>
								<p className="text-medium">{item?.AddHistory?.Calltype}</p>
							</td>
							<td></td>
							<td></td>
						</tr>
						<tr className={clsx(!expand[index] && 'hidden')}>
							<td></td>
							<td>
								<div className="sm:flex sm:justify-between sm:border-b sm:border-gray-300">
									<div className="grid max-sm:grid-cols-4 gap-x-1 text-gray-500 max-sm:border-b max-sm:border-gray-300 sm:grid-rows-4 sm:grid-flow-col">
										<p className="text-medium col-span-2 sm:row-span-2">From:</p>
										<p>To:</p>
										<p>On:</p>
									</div>
									<div className="grid max-sm:grid-cols-4 gap-x-1 mb-6 gap-y-3 mt-3 sm:grid-rows-4 sm:grid-flow-col sm:mt-0 sm:mb-3">
										{item?.AddHistory.CallDetails?.map((detail, index) => {
											return (
												<>
													<p className="text-medium text-black">{detail.Name}</p>
													<p className="text-medium text-red-500">{detail.From}</p>
													<p className="text-medium">{detail.To}</p>
													<p>{moment(detail.Date).format('DD MMM, YYYY')}</p>
												</>
											)
										})}
									</div>
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
									{item?.AddHistory.AddPricingHistory?.map(detail => {
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
											<p className="text-black">{item.AddCommission?.Amount}</p>
										</span>
										<span className="flex space-x-1">
											<p>Cheque#</p>
											<p className="text-black">{item.AddCommission?.Cheque}</p>
										</span>
									</div>
									<span className="flex space-x-1">
										<p>Account#</p>
										<p className="text-black">{item.AddCommission?.AccountNumber}</p>
									</span>
									<span className="flex space-x-1">
										<p>Bank Details:</p>
										<p className="text-black">{item.AddCommission?.BankDetails}</p>
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

export const getServerSideProps = async () => {
	const response = await propertyService.getHistory()
	return {
		props: {
			propertiesHistory: response || []
		}
	}
}

export default PropertyHistory
