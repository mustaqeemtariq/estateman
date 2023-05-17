import clsx from 'clsx'
import moment from 'moment'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import EmptyImage from 'src/assets/card/emptyImage.png'
import { Container } from 'src/components/app/container'
import { AppFilter } from 'src/components/app/filter'
import { AppHeader } from 'src/components/app/header'
import { AppLayout } from 'src/components/app/layout'
import { Table } from 'src/components/app/table'
import { AuctionHeader } from 'src/components/auction/header'
import auctionService from 'src/services/auction'
import { Auction, FilterParameter } from 'src/types/typings'
import { ApplyAuctionFilter } from 'src/utils/filter'

interface AuctionListProps {
	auctionsData: Auction[]
}

const AuctionList = ({ auctionsData }: AuctionListProps) => {
	const [data, setData] = useState(auctionsData)
	const [state, setState] = useState('All Auctions')
	const [filterParams, setFilterParams] = useState<FilterParameter>({
		city: '',
		society: '',
		auctioneer: ''
	})

	useEffect(() => {
		const filteredData = ApplyAuctionFilter(filterParams, auctionsData)
		setData(filteredData)
	}, [filterParams])

	const router = useRouter()

	const renderPeopleTBody = (data: Auction[]) => {
		return (
			<tbody className="bg-white">
				{data.map((item, index) => (
					<tr onClick={() => router.push(`/auction/view/${item._id}`)} key={item.Title + index} className={clsx('cursor-pointer', index % 2 === 0 && 'bg-gray-100')}>
						<td className="tw-table-td col-span-2">
							<Image
								src={item.images?.[0] ?? EmptyImage}
								width={20}
								height={20}
								alt="propertyImage"
							/>
						</td>
						<td className="tw-table-td">
							<div className="flex flex-col">
								{item.Title}
								<span className="text-blue-500">{item.Location} 22</span>
							</div>
						</td>
						<td className="tw-table-td">{item.City}</td>
						<td className="tw-table-td">{item.Society}</td>
						<td className="tw-table-td">{item.Auctioneer}</td>
						<td className="tw-table-td">{item.LandArea}</td>
						<td className="tw-table-td">
							<div className="flex flex-col">
								<span>{moment(item.AuctionDateandTime).format('MMM DD, YYYY')}</span>
								<span>{moment(item.AuctionDateandTime).format('hh:mm A')}</span>
							</div>
						</td>
					</tr>
				))}
			</tbody>
		)
	}

	return (
		<AppLayout>
			<AppHeader />
			<Container>
				<AuctionHeader state={state} setState={setState} />
				<AppFilter auction={true} setFilterData={setFilterParams} length={data.length} />
				<div className="mt-6 flow-root overflow-hidden rounded-lg">
					<div className="-my-2 -mx-4 overflow-x-auto  sm:-mx-6 lg:-mx-8">
						<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
							<div>
								<Table
									headers={['Property', '', 'City', 'Society', 'Auctioneer', 'Size', 'Auction']}
									items={data}
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
	const response = await auctionService.getAllAuctions()
	return {
		props: {
			auctionsData: response
		}
	}
}

export default AuctionList
