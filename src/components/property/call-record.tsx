import {
	Control,
	Controller,
	FieldErrors,
	UseFormGetValues,
	UseFormRegister,
	UseFormResetField,
	UseFormSetValue,
	UseFormWatch
} from 'react-hook-form'
import { Property } from 'src/types/typings'
import { Input, InputNumber } from '../app/input'

import { PlusIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { Dispatch, SetStateAction } from 'react'
import { DateInput } from '../app/date'

interface CallRecordProps {
	isFirst: boolean
	recordCount: number
	setRecordCount: Dispatch<SetStateAction<number>> | undefined
	register?: UseFormRegister<Property>
	errors?: FieldErrors<Property>
	control?: Control<Property, any>
	setValue?: UseFormSetValue<Property>
	resetField?: UseFormResetField<Property>
	watch?: UseFormWatch<Property>
	getValues: UseFormGetValues<Property> | undefined
	index: number
}

const CallRecord = ({
	setValue,
	getValues,
	resetField,
	recordCount,
	setRecordCount,
	isFirst,
	errors,
	register,
	control,
	index
}: CallRecordProps) => {
	const handleDate = (value: string) => {
		setValue?.(`SentCallDetails.${[index]}.CallerDate`, value)
	}

	const handleAdd = () => {
		setRecordCount?.(prev => prev + 1)
	}

	const handleRemove = () => {
		setRecordCount?.(prev => prev - 1)
		resetField?.(`SentCallDetails.${[index]}.CallerDate`)
		resetField?.(`SentCallDetails.${[index]}.CallerFrom`)
		resetField?.(`SentCallDetails.${[index]}.CallerName`)
		resetField?.(`SentCallDetails.${[index]}.CallerTo`)
	}

	return (
		<div className="flex space-x-2 items-center">
			<DateInput
				id="date"
				placeholder="Date"
				autoComplete="date"
				name={`SentCallDetails.${[index]}.CallerDate`}
				required={true}
				autoCapitalize="false"
				onCalendarClick={handleDate}
			/>
			<label htmlFor="phone">From: </label>
			<Controller
				name={`SentCallDetails.${[index]}.CallerFrom`}
				control={control}
				render={({ field: { onChange, value } }) => (
					<InputNumber
						id="phone"
						autoComplete="phone"
						name={`CallDetails.${[index]}.CallerFrom`}
						error={errors}
						required={true}
						placeholder="123987654321"
						maxLength={13}
						onChange={onChange}
						value={value}
					/>
				)}
			/>
			<Input
				id="callername"
				autoComplete="callername"
				register={register}
				name={`CallDetails.${[index]}.CallerName`}
				error={errors}
				required={true}
				autoCapitalize="false"
				placeholder="Caller Name"
			/>
			<label htmlFor="phone">To: </label>
			<Controller
				name={`SentCallDetails.${[index]}.CallerTo`}
				control={control}
				render={({ field: { onChange, value } }) => (
					<InputNumber
						id="phone"
						autoComplete="phone"
						name={`CallDetails.${[index]}.CallerTo`}
						error={errors}
						required={true}
						placeholder="923007654321"
						onChange={onChange}
						maxLength={13}
						value={value}
					/>
				)}
			/>

			{isFirst && (
				<button
					type="button"
					onClick={handleAdd}
					className="bg-[#0038FF] rounded-md p-2 text-white mt-1">
					<PlusIcon className="h-7 w-7 stroke-white" aria-hidden="true" />
				</button>
			)}

			{recordCount > 1 && !isFirst && (
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

export default CallRecord
