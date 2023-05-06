import { CalendarDaysIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { InputHTMLAttributes, useState } from 'react'
import { FieldError, FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import { containsOnlyDigits } from 'src/utils/string'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	labelText?: string
	disabled?: boolean
	name: string
	index?: string
	register?: UseFormRegister<any>
	error?: FieldErrors<FieldValues>
	controllerError?: FieldError | undefined
	renderLabel?: boolean
	required?: boolean
	year?: boolean
	onChange?: React.ChangeEventHandler<HTMLInputElement>
}

export const Input = ({
	labelText,
	index,
	name,
	placeholder,
	disabled,
	register,
	year,
	error,
	renderLabel = true,
	required,
	onChange,
	...props
}: InputProps) => {
	const errorText = error?.[name]?.message as string

	const [date, setDate] = useState<string>('')

	const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target
		const date = new Date(value)
		if (year) {
			const year = date.getFullYear()
			setDate(year.toString())
			onChange?.(event)
		} else {
			const formattedDate = `${date.getDate()} ${date.toLocaleString('default', {
				month: 'short'
			})}, ${date.getFullYear()}`
			setDate(formattedDate)
			onChange?.(event)
		}
	}

	return (
		<div className="w-full">
			{renderLabel && labelText && (
				<label htmlFor={name} className="block text-[#0D0C18]">
					{labelText} {required && <span className="text-[#FF0000]">*</span>}
				</label>
			)}
			<div className="mt-1  relative flex items-center">
				<input
					{...props}
					{...(register?.(name) ?? {})}
					onChange={props.type == 'date' ? handleDateChange : onChange}
					placeholder={placeholder}
					id={index}
					className={clsx(
						'block placeholder-[#0D0C18] w-full  bg-[#E6E6E6] rounded-md border border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm',
						disabled && 'placeholder-gray-500',
						props.type == 'date' && 'opacity-0 absolute z-50'
					)}
				/>
				{props.type == 'date' && (
					<>
						<input
							type="text"
							disabled
							placeholder={placeholder}
							value={date}
							className={clsx(
								'block placeholder-[#0D0C18] w-full  bg-[#E6E6E6] rounded-md border border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm',
								disabled && 'placeholder-gray-500'
							)}
						/>
						<div
							className="absolute right-1"
							onClick={() => {
								const dateInput = document.querySelector('input[type="date"]') as HTMLInputElement
								dateInput.click()
							}}>
							<CalendarDaysIcon
								className="h-5 w-5 stroke-black cursor-pointer"
								aria-hidden="true"
							/>
						</div>
					</>
				)}
			</div>

			{errorText && <p className="text-xs text-red-600">{errorText}</p>}
		</div>
	)
}

export const InputNumber = ({
	labelText,
	index,
	name,
	error,
	maxLength,
	disabled,
	renderLabel = true,
	onChange,
	className,
	value,
	required,
	...props
}: InputProps) => {
	const [input, setInput] = useState<string>(value?.toString() ?? '')

	const errorText = error?.[name]?.message as string

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target
		if (
			value === '' ||
			(containsOnlyDigits(value) && (maxLength ? value.length <= maxLength : true))
		) {
			setInput(value)
			onChange?.(event)
		}
	}

	return (
		<div className="w-full">
			{renderLabel && labelText && (
				<label htmlFor={name} className="block text-[#0D0C18] capitalize">
					{labelText} {required && <span style={{ color: 'red' }}>*</span>}
				</label>
			)}
			<div className="mt-1">
				<input
					{...props}
					onChange={handleInputChange}
					value={input}
					type="text"
					id={index}
					className={clsx(
						'block placeholder-[#0D0C18] w-full appearance-none bg-[#E6E6E6] rounded-md border border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm',
						className,
						disabled && 'placeholder-gray-500'
					)}
				/>
			</div>
			{errorText && <p className="text-xs text-red-600">{errorText}</p>}
		</div>
	)
}
