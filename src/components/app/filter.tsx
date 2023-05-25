import clsx from 'clsx'
import { Dispatch, SetStateAction } from 'react'
import { CityNames } from 'src/constants/constants'
import { useAppSelector } from 'src/hooks/rtk'
import { FilterParameter } from 'src/types/typings'

interface AppFilterProps {
	showContract?: boolean
	showStatus?: boolean
	auction?: boolean
	count?: number
	length?: number
	setFilterData: Dispatch<SetStateAction<FilterParameter>>
}

export const AppFilter = ({
	showContract = false,
	showStatus = false,
	auction = false,
	count,
	length,
	setFilterData
}: AppFilterProps) => {
	const handleData = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = event.target
		setFilterData(prev => ({ ...prev, [name]: value }))
	}

	const { Roles } = useAppSelector(state => state.auth)
	const auctions = useAppSelector(state => state.db.auctions)

	return (
		<div className={clsx(!auction && 'flex space-x-2 my-4')}>
			{!auction && (
				<div
					className={clsx(Roles === 'surveyor' ? 'flex items-center space-x-5 w-full' : 'contents')}>
					<div className={clsx(Roles !== 'surveyor' && 'hidden', 'space-x-1 flex text-[#717B9D]')}>
						<h3>{count}</h3>
						<h3>Properties</h3>
					</div>
					<div className="flex space-x-2 w-full">
						<select
							name="period"
							onChange={handleData}
							className="mt-1 block w-full rounded-md border-0 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 sm:text-sm sm:leading-6 outline-none">
							<option value="newest">Newest</option>
							<option value="oldest">Oldest</option>
						</select>
						<select
							name="city"
							onChange={handleData}
							className="mt-1 block w-full rounded-md border-0 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 sm:text-sm sm:leading-6 outline-none">
							<option value="">City</option>
							{Object.values(CityNames).map(unit => (
								<option key={unit} value={unit}>
									{unit}
								</option>
							))}
						</select>
						<select
							name="type"
							onChange={handleData}
							className="mt-1 block w-full rounded-md border-0 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 sm:text-sm sm:leading-6 outline-none">
							<option value="">Type</option>
							<option value="Residential">Residential</option>
							<option value="Commercial">Commercial</option>
							<option value="Special Commercial">Special Commercial</option>
						</select>
						<select
							name="category"
							onChange={handleData}
							className="mt-1 block w-full rounded-md border-0 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 sm:text-sm sm:leading-6 outline-none">
							<option value="">Category</option>
							<option value="House">House</option>
							<option value="Penthouse">PentHouse</option>
							<option value="Apartment">Apartment</option>
							<option value="Studio">Studio</option>
							<option value="Villa">Villa</option>
							<option value="Plot">Plot</option>
							<option value="Land">Agricultural Land</option>
						</select>

						{showContract && (
							<select
								name="contract"
								onChange={handleData}
								className="mt-1 block w-full rounded-md border-0 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 sm:text-sm sm:leading-6 outline-none">
								<option value="">Contract</option>
								<option value="Rent">For Rent</option>
								<option value="Sale">For Sale</option>
							</select>
						)}

						{showStatus && (
							<select
								name="status"
								onChange={handleData}
								className="mt-1 block w-full rounded-md border-0 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 sm:text-sm sm:leading-6 outline-none">
								<option value="">Status</option>
								<option value="vacant">Vacant</option>
								<option value="occupied">Occupied</option>
							</select>
						)}
					</div>
				</div>
			)}

			{auction && (
				<div className="grid grid-cols-6 items-center my-4">
					<div className="text-[#717B9D] col-span-2">{length} Auctions</div>
					<div className="flex space-x-2 col-span-4">
						<select
							name="city"
							onChange={handleData}
							className="mt-1 block w-full rounded-md border-0 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 sm:text-sm sm:leading-6 outline-none">
							<option value="">City</option>
							{Object.values(CityNames).map(unit => (
								<option key={unit} value={unit}>
									{unit}
								</option>
							))}
						</select>
						<select
							name="auctioneer"
							onChange={handleData}
							className="mt-1 block w-full rounded-md border-0 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 sm:text-sm sm:leading-6 outline-none">
							<option value="">Auctioneer</option>
							<option value="Government">Govt</option>
							<option value="Bank">Bank</option>
						</select>
						<select
							name="society"
							onChange={handleData}
							className="mt-1 block w-full rounded-md border-0 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 sm:text-sm sm:leading-6 outline-none">
							<option value="">Society</option>
							{Object.values(auctions)
								.reduce((uniqueOptions: string[], auction) => {
									if (auction.Society && !uniqueOptions.includes(auction.Society)) {
										uniqueOptions.push(auction.Society)
									}
									return uniqueOptions
								}, [])
								.map((option: string, index) => (
									<option key={index} value={option}>
										{option}
									</option>
								))}
						</select>
					</div>
				</div>
			)}
		</div>
	)
}
