import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import EmptyImage from 'src/assets/card/emptyImage.png'
import { Property } from 'src/types/typings'
import { dateDifference } from 'src/utils/date'
import { Table } from '../app/table'

interface ListCardProps {
	data: Property[]
}

export const PropertyListCard = ({ data }: ListCardProps) => {
	const renderPeopleTBody = (data: Property[]) => {
		return (
			<tbody className="bg-white">
				{data.map((item, index) => (
					<tr
						key={item.Title + index}
						className={clsx('relative hover:bg-[#0D0C18]/[85%]', index % 2 === 0 && 'bg-gray-100')}>
						<td className="tw-table-td pr-0 col-span-2">
							<Image
								src={EmptyImage}
								alt="propertyImage"
								className="w-full object-stretch rounded-md max-w-50"
							/>
						</td>
						<td className="tw-table-td">
							<div className="flex flex-col">
								{item.Title}
								<span className="text-blue-500">{item.Address} 22</span>
							</div>
						</td>
						<td className="tw-table-td">{item.City}</td>
						<td className="tw-table-td">{item.PropertyCategory}</td>
						<td
							className={clsx(
								'tw-table-td font-semibold',
								item.OccupancyStatus === 'Not Sold' && 'text-[#058019]',
								item.OccupancyStatus === 'Sold' && 'text-[#0B124D]',
								item.OccupancyStatus === 'Vacant' && 'text-[#DC4200]',
								item.OccupancyStatus === 'Occupied' && 'text-[#000000]'
							)}>
							{item.OccupancyStatus}
						</td>
						<td className="tw-table-td">{item.ContractType}</td>
						<td className="tw-table-td">
							<div>
								{dateDifference(item.AddHistory.LeaseExpiringOn ?? '') < 0 ? (
									<div className="flex flex-col items-center text-[#FF0000]">
										<ExclamationTriangleIcon className="text-[#FF0000] h-5 w-5" />
										{moment(item?.LeaseExpiringOn).format('DD MMM, YYYY')}
									</div>
								) : dateDifference(item.AddHistory.LeaseExpiringOn ?? '') <= 1 ? (
									<div className="flex flex-col items-center text-[#DC4200]">
										<ExclamationTriangleIcon className="text-[#DC4200] h-5 w-5" />
										{moment(item?.LeaseExpiringOn).format('DD MMM, YYYY')}
									</div>
								) : null}
							</div>
						</td>
						<td className="z-20 inset-x-0 absolute inset-y-0">
							<div className="z-20 opacity-0 hover:opacity-100 transition-opacity w-full inset-0 absolute flex justify-center items-center">
								<Link href={`/property/view/${item.Title}`}>
									<button className="mx-2 text-black bg-[#FCFDFF] rounded-md px-9 py-2 uppercase">
										View
									</button>
								</Link>
								<Link href={`/property/edit/${item.Title}`}>
									<button className="mx-2 text-white bg-[#DC4200] rounded-md px-10 py-2 uppercase">
										Edit
									</button>
								</Link>
								<Link href={'/property/history'}>
									<button className="mx-2 text-white bg-[#0038FF] rounded-md px-8 py-2">
										Add History
									</button>
								</Link>
							</div>
						</td>
					</tr>
				))}
			</tbody>
		)
	}

	return (
		<>
			<div className="mt-6 flow-root overflow-hidden rounded-lg">
				<div className="-my-2 -mx-4 overflow-x-auto  sm:-mx-6 lg:-mx-8">
					<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
						<div>
							<Table
								headers={['Property', '', 'City', 'Category', 'Status', 'Contract', 'Expiring On']}
								items={data}
								renderComponent={renderPeopleTBody}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
