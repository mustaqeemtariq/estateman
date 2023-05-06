import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { CallRecordForm } from 'src/types/typings'
import { Input, InputNumber } from '../app/input'

import { PlusIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { Dispatch, SetStateAction } from 'react'
import * as yup from 'yup'

interface CallRecordProps {
	isFirst: boolean
	recordCount: number
	setRecordCount: Dispatch<SetStateAction<number>>
}

const CallRecord = ({ recordCount, setRecordCount, isFirst }: CallRecordProps) => {
	const schema = yup.object<CallRecordForm>().shape({})

	const {
		register,
		control,
		formState: { errors }
	} = useForm<CallRecordForm>({
		resolver: yupResolver(schema),
		mode: 'all'
	})

	return (
		<div className="flex space-x-2 items-center">
			<Input
				type="date"
				id="date"
				placeholder="Date"
				autoComplete="date"
				register={register}
				name="date"
				error={errors}
				required={true}
				disabled={isFirst}
				autoCapitalize="false"
			/>
			<label htmlFor="phone">From: </label>
			<Controller
				name={'phone'}
				control={control}
				render={({ field: { onChange, value } }) => (
					<InputNumber
						id="phone"
						autoComplete="phone"
						name="phone"
						error={errors}
						required={true}
						disabled={isFirst}
						placeholder="+123987654321"
						maxLength={12}
						onChange={onChange}
						value={value}
					/>
				)}
			/>
			<Input
				id="callername"
				autoComplete="callername"
				register={register}
				name="callername"
				error={errors}
				required={true}
				disabled={isFirst}
				autoCapitalize="false"
				placeholder="Caller Name"
			/>
			<label htmlFor="phone">To: </label>
			<Controller
				name={'phone'}
				control={control}
				render={({ field: { onChange, value } }) => (
					<InputNumber
						id="phone"
						autoComplete="phone"
						name="phone"
						error={errors}
						required={true}
						disabled={isFirst}
						placeholder="+923007654321"
						onChange={onChange}
						maxLength={12}
						value={value}
					/>
				)}
			/>

			{isFirst && (
				<button
					onClick={() => setRecordCount(prev => prev + 1)}
					className="bg-[#0038FF] rounded-md p-2 text-white mt-1">
					<PlusIcon className="h-7 w-7 stroke-white" aria-hidden="true" />
				</button>
			)}

			{recordCount > 1 && !isFirst && (
				<button
					onClick={() => setRecordCount(prev => prev - 1)}
					className="bg-[#717B9D] rounded-md p-2 text-white mt-1">
					<XMarkIcon className="h-7 w-7 stroke-white" aria-hidden="true" />
				</button>
			)}
		</div>
	)
}

export default CallRecord
