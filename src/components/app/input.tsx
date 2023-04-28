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
		<div className='w-full'>
			{renderLabel && labelText && (
				<label htmlFor={name} className="block text-sm font-small text-[#717B9D]">
					{labelText} {required && <span style={{ color: "red" }}>*</span>}
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
		<div className='w-full'>
			{renderLabel && labelText && (
				<label htmlFor={name} className="block text-sm font-small text-[#717B9D]">
					{labelText} {required && <span style={{ color: "red" }}>*</span>}
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


export const Checkbox = ({
	labelText,
	name,
	checked,
	renderLabel = true,
	...props
}: InputProps) => {

	return (
		<div className="flex items-center">
			<input
				id={name}
				name={name}
				type="checkbox"
				defaultChecked={checked}
				className="h-4 w-4 text-indigo-600 focus:ring-indigo-600"
				{...props}
			/>
			<label htmlFor={name} className="ml-3 block text-base leading-2 border-gray-300 text-gray-900">
				{labelText}
			</label>
		</div>
	)
}


