import { InputHTMLAttributes, useState } from 'react'
import { FieldError, FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import { containsOnlyDigits } from 'src/utils/string'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	labelText?: string
	name: string
	index?: string
	register?: UseFormRegister<any>
	error?: FieldErrors<FieldValues>
	controllerError?: FieldError | undefined
	renderLabel?: boolean
	required?: boolean
	onChange?: React.ChangeEventHandler<HTMLInputElement>
}

export const Input = ({
	labelText,
	index,
	name,
	register,
	error,
	renderLabel = true,
	required,
	onChange,
	...props
}: InputProps) => {
	const errorText = error?.[name]?.message as string

	return (
		<div className="w-full">
			{renderLabel && labelText && (
				<label htmlFor={name} className="block text-[#0D0C18]">
					{labelText} {required && <span className="text-[#FF0000]">*</span>}
				</label>
			)}
			<div className="mt-1">
				<input
					{...props}
					{...(register?.(name) ?? {})}
					onChange={onChange}
					id={index}
					className="block placeholder-[#0D0C18] w-full appearance-none bg-[#E6E6E6] rounded-md border border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
				/>
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
	renderLabel = true,
	onChange,
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
				<label htmlFor={name} className="block text-[#0D0C18]">
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
					className="block placeholder-[#0D0C18] w-full appearance-none bg-[#E6E6E6] rounded-md border border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
				/>
			</div>
			{errorText && <p className="text-xs text-red-600">{errorText}</p>}
		</div>
	)
}
