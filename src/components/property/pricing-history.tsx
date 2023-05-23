import {
	Control,
	Controller,
	FieldErrors,
	UseFormRegister,
	UseFormSetValue,
	UseFormWatch
} from 'react-hook-form'
import { Property } from 'src/types/typings'
import { InputNumber } from '../app/input'

import { PlusIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { Dispatch, SetStateAction } from 'react'
import { DateInput } from '../app/date'
import { HistoryDate } from './form'
import { toast } from 'react-hot-toast'

interface PricingHistoryProps {
	isFirst: boolean
	priceCount: number
	setPriceCount: Dispatch<SetStateAction<number>> | undefined
	register?: UseFormRegister<Property>
	errors?: FieldErrors<Property>
	control?: Control<Property, any>
	setValue?: UseFormSetValue<Property>
	priceDate?: HistoryDate
	setPriceDate?: Dispatch<SetStateAction<HistoryDate>>
	watch?: UseFormWatch<Property>
	index: number
}

const PricingHistory = ({
	setValue,
	priceCount,
	setPriceCount,
	priceDate,
	setPriceDate,
	isFirst,
	register,
	errors,
	control,
	index
}: PricingHistoryProps) => {
	const handleDate = (value: string) => {
		setValue?.(`SentPricingHistory.${[index]}.year`, value)
		setPriceDate?.(prevData => ({
			...prevData,
			[index]: {
				date: value
			}
		}))
	}

	const handleAdd = () => {
		setPriceCount?.(prev => prev + 1)
	}

	const handleRemove = () => {
		if (priceCount - 1 > index ) {
			toast.error('Please remove last record first')
		}
		else {
			setPriceCount?.(prev => prev - 1)
			setPriceDate?.(prevData => ({
				...prevData,
				[index]: {
					date: undefined
				}
			}))
			setValue?.(`SentPricingHistory.${index}.year`, '')
			setValue?.(`SentPricingHistory.${index}.price`, '')
		}
	}

	const prevValue = priceDate?.[index]?.date || ''

	return (
		<div className="flex space-x-2 items-center">
			<label htmlFor="price">Price(Pkr) </label>
			<Controller
				name={`SentPricingHistory.${[index]}.price`}
				control={control}
				render={({ field: { onChange, value } }) => (
					<InputNumber
						id="price"
						autoComplete="price"
						name={`price`}
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
				prevValue={prevValue}
				register={register}
				onCalendarClick={handleDate}
				name={`SentPricingHistory.${[index]}.year`}
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
