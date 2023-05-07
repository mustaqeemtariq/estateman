import { CalendarDaysIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { InputHTMLAttributes, useEffect, useState } from 'react'
import { FieldError, FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

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
	onCalendarClick?: (value: string) => void
}

export const DateInput = ({
	labelText,
	index,
	value,
	name,
	placeholder,
	disabled,
	register,
	onCalendarClick,
	year,
	error,
	renderLabel = true,
	required,
	onChange,
	...props
}: InputProps) => {
	const errorText = error?.[name]?.message as string

	const [date, setDate] = useState<string>('')

	useEffect(() => {
		setDate('')
	}, [disabled])

	const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target
		const dateValue = new Date(value)
		if (year) {
			const year = dateValue.getFullYear()
			setDate(year.toString())
			onCalendarClick?.(year.toString())
			onChange?.(event)
		} else {
			const formattedDate = `${dateValue.getDate()} ${dateValue.toLocaleString('default', {
				month: 'short'
			})}, ${dateValue.getFullYear()}`

			if (dateValue.toString() === 'Invalid Date') {
				setDate('')
				onCalendarClick?.('')
			} else {
				setDate(formattedDate)
				onCalendarClick?.(formattedDate)
				onChange?.(event)
			}
		}
	}

	return (
		<div className="w-full">
			{renderLabel && labelText && (
				<label htmlFor={name} className="block text-[#0D0C18]">
					{labelText} {required && <span className="text-[#FF0000]">*</span>}
				</label>
			)}
			<div className="mt-1 relative flex items-center">
				<input
					{...props}
					type="date"
					onChange={handleDateChange}
					placeholder={placeholder}
					disabled={disabled}
					id={index}
					className={clsx(
						'block opacity-0 absolute z-50 placeholder-[#0D0C18] w-full  bg-[#E6E6E6] rounded-md border border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm',
						disabled && 'placeholder-gray-500'
					)}
				/>

				<input
					type="text"
					{...(register?.(name) ?? {})}
					placeholder={placeholder}
					disabled
					value={date ?? ''}
					className={clsx(
						'block placeholder-gray-500 w-full  bg-[#E6E6E6] rounded-md border border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
					)}
				/>
				<div
					className="absolute right-1"
					onClick={() => {
						const dateInput = document.querySelector('input[type="date"]') as HTMLInputElement
						dateInput.click()
					}}>
					<CalendarDaysIcon className="h-5 w-5 stroke-black cursor-pointer" aria-hidden="true" />
				</div>
			</div>

			{!disabled && errorText && <p className="text-xs text-red-600">{errorText}</p>}
		</div>
	)
}
