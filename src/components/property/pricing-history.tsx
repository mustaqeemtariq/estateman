import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { PricingHistoryForm } from 'src/types/typings'
import { InputNumber } from '../app/input'

import { PlusIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { Dispatch, SetStateAction } from 'react'
import * as yup from 'yup'
import { DateInput } from '../app/date'

interface PricingHistoryProps {
	isFirst: boolean
	priceCount: number
	setPriceCount: Dispatch<SetStateAction<number>>
}

const PricingHistory = ({ priceCount, setPriceCount, isFirst }: PricingHistoryProps) => {
	const schema = yup.object<PricingHistoryForm>().shape({})

	const {
		control,
		formState: { errors }
	} = useForm<PricingHistoryForm>({
		resolver: yupResolver(schema),
		mode: 'all'
	})

	return (
		<div className="flex space-x-2 items-center">
			<label htmlFor="price">Price(Pkr) </label>
			<Controller
				name={'price'}
				control={control}
				render={({ field: { onChange, value } }) => (
					<InputNumber
						id="price"
						autoComplete="price"
						name="price"
						error={errors}
						disabled={isFirst}
						required={true}
						placeholder="0"
						onChange={onChange}
						value={value}
						currency={true}
					/>
				)}
			/>
			<label htmlFor="date" className="whitespace-nowrap">
				In Year
			</label>
			<DateInput
				type="date"
				id="date"
				year={true}
				placeholder="Year"
				autoComplete="date"
				name="date"
				disabled={isFirst}
				required={true}
				autoCapitalize="false"
			/>

			{isFirst && (
				<button
					type="button"
					onClick={() => setPriceCount(prev => prev + 1)}
					className="bg-[#0038FF] rounded-md p-2 text-white mt-1">
					<PlusIcon className="h-7 w-7 stroke-white" aria-hidden="true" />
				</button>
			)}

			{priceCount > 1 && !isFirst && (
				<button
					type="button"
					onClick={() => setPriceCount(prev => prev - 1)}
					className="bg-[#717B9D] rounded-md p-2 text-white mt-1">
					<XMarkIcon className="h-7 w-7 stroke-white" aria-hidden="true" />
				</button>
			)}
		</div>
	)
}

export default PricingHistory
