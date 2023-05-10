import { Dispatch, SetStateAction } from 'react'
import { CityNames } from 'src/constants/constants'
import { FilterParameter } from 'src/types/typings'

interface AppFilterProps {
	showContract?: boolean
	showStatus?: boolean
	setFilterData: Dispatch<SetStateAction<FilterParameter>>
}

export const AppFilter = ({
	showContract = false,
	showStatus = false,
	setFilterData
}: AppFilterProps) => {
	const handleData = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = event.target
		setFilterData(prev => ({ ...prev, [name]: value }))
	}

	return (
		<div className="flex space-x-2 mb-4">
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
				<option value="residential">Residential</option>
				<option value="commercial">Commercial</option>
			</select>
			<select
				name="category"
				onChange={handleData}
				className="mt-1 block w-full rounded-md border-0 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 sm:text-sm sm:leading-6 outline-none">
				<option value="house">House</option>
				<option value="penthouse">PentHouse</option>
				<option value="apartment">Apartment</option>
				<option value="studio">Studio</option>
				<option value="villa">Villa</option>
				<option value="plot">Plot</option>
				<option value="land">Agricultural Land</option>
			</select>
			{showContract && (
				<select
					name="contract"
					onChange={handleData}
					className="mt-1 block w-full rounded-md border-0 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 sm:text-sm sm:leading-6 outline-none">
					<option value="">Contract</option>
					<option value="rent">For Rent</option>
					<option value="sale">For Sale</option>
				</select>
			)}
			{showStatus && (
				<select
					name="status"
					onChange={handleData}
					className="mt-1 block w-full rounded-md border-0 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 sm:text-sm sm:leading-6 outline-none">
					<option value="">Status</option>
					<option value="vacant">For Rent</option>
					<option value="occupied">For Sale</option>
				</select>
			)}
		</div>
	)
}
