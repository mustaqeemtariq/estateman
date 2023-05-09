import {
	Control,
	Controller,
	FieldErrors,
	UseFieldArrayAppend,
	UseFieldArrayRemove,
	UseFormRegister,
	UseFormResetField,
	UseFormSetValue,
	UseFormWatch
} from 'react-hook-form'
import { CallRecordForm, Property } from 'src/types/typings'
import { Input, InputNumber } from '../app/input'

import { PlusIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { Dispatch, SetStateAction } from 'react'
import * as yup from 'yup'
import { DateInput } from '../app/date'

interface CallRecordProps {
	isFirst: boolean
	recordCount: number
	setRecordCount: Dispatch<SetStateAction<number>>
	register?: UseFormRegister<Property>
	errors?: FieldErrors<Property>
	control?: Control<Property, any>
	setValue?: UseFormSetValue<Property>
	resetField?: UseFormResetField<Property>
	watch?: UseFormWatch<Property>
	appendData: UseFieldArrayAppend<Property, 'CallDetails'> | undefined
	removeData: UseFieldArrayRemove | undefined
}

const CallRecord = ({
	removeData,
	appendData,
	setValue,
	recordCount,
	setRecordCount,
	isFirst,
	errors,
	register,
	control
}: CallRecordProps) => {
	const schema = yup.object<CallRecordForm>().shape({})

	const handleDate = (value: string) => {
		setValue?.('CallerDate', value)
	}

	const handleAdd = () => {
		appendData?.({ CallerDate: '', CallerFrom: '', CallerName: '', CallerTo: '' })
		setRecordCount(prev => prev + 1)
	}

	const handleRemove = () => {
		const indexToRemove = recordCount - 1
		removeData?.(indexToRemove)
		setRecordCount(prev => prev - 1)
	}

	return (
		<div className="flex space-x-2 items-center">
			<DateInput
				id="date"
				placeholder="Date"
				autoComplete="date"
				name="CallerDate"
				required={true}
				autoCapitalize="false"
				onCalendarClick={handleDate}
			/>
			<label htmlFor="phone">From: </label>
			<Controller
				name={'CallerFrom'}
				control={control}
				render={({ field: { onChange, value } }) => (
					<InputNumber
						id="phone"
						autoComplete="phone"
						name="CallerFrom"
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
				name="CallerName"
				error={errors}
				required={true}
				autoCapitalize="false"
				placeholder="Caller Name"
			/>
			<label htmlFor="phone">To: </label>
			<Controller
				name={'CallerTo'}
				control={control}
				render={({ field: { onChange, value } }) => (
					<InputNumber
						id="phone"
						autoComplete="phone"
						name="CallerTo"
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
