import {
	Control,
	Controller,
	FieldErrors,
	UseFormRegister,
	UseFormResetField,
	UseFormSetValue,
	UseFormWatch
} from 'react-hook-form'
import { Property } from 'src/types/typings'
import { InputNumber } from '../app/input'

import { PlusIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { Dispatch, SetStateAction } from 'react'
import { DateInput } from '../app/date'

interface PricingHistoryProps {
	isFirst: boolean
	priceCount: number
	setPriceCount: Dispatch<SetStateAction<number>> | undefined
	register?: UseFormRegister<Property>
	errors?: FieldErrors<Property>
	control?: Control<Property, any>
	setValue?: UseFormSetValue<Property>
	resetField?: UseFormResetField<Property>
	watch?: UseFormWatch<Property>
	index: number
}

const PricingHistory = ({
	setValue,
	priceCount,
	resetField,
	setPriceCount,
	isFirst,
	register,
	errors,
	control,
	watch,
	index
}: PricingHistoryProps) => {
	const handleDate = (value: string) => {
		setValue?.(`SentPricingHistory.${[index]}.HistoryYear`, value)
	}

	const price = watch?.('SentPricingHistory.HistoryPrice')
	const year = watch?.('SentPricingHistory.HistoryYear')

	const handleAdd = () => {
		setPriceCount?.(prev => prev + 1)
	}

	const handleRemove = () => {
		setPriceCount?.(prev => prev - 1)
		resetField?.(`SentPricingHistory.${[index]}.HistoryPrice`)
		resetField?.(`SentPricingHistory.${[index]}.HistoryYear`)
	}

	return (
		<div className="flex space-x-2 items-center">
			<label htmlFor="price">Price(Pkr) </label>
			<Controller
				name={`SentPricingHistory.${[index]}.HistoryPrice`}
				control={control}
				render={({ field: { onChange, value } }) => (
					<InputNumber
						id="price"
						autoComplete="price"
						name={`HistoryPrice`}
						error={errors}
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
				id="date"
				year={true}
				placeholder="Year"
				autoComplete="date"
				register={register}
				onCalendarClick={handleDate}
				name={`SentPricingHistory.${[index]}.HistoryYear`}
				required={true}
				autoCapitalize="false"
			/>

			{isFirst && (
				<button
					type="button"
					onClick={handleAdd}
					className="bg-[#0038FF] rounded-md p-2 text-white mt-1">
					<PlusIcon className="h-7 w-7 stroke-white" aria-hidden="true" />
				</button>
			)}

			{priceCount > 1 && !isFirst && (
				<button
					type="button"
					onClick={handleRemove}
					className="bg-[#717B9D] rounded-md p-2 text-white mt-1">
					<XMarkIcon className="h-7 w-7 stroke-white" aria-hidden="true" />
				</button>
			)}
		</div>
	)
}

export default PricingHistory
