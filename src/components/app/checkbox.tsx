import clsx from 'clsx'
import { InputHTMLAttributes, useState } from 'react'
import { FieldError, FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	labelText?: string
	name: string
	index?: string
	checked?: boolean
	value?: string
	register?: UseFormRegister<any>
	error?: FieldErrors<FieldValues>
	controllerError?: FieldError | undefined
	renderLabel?: boolean
	required?: boolean
	onChange: React.ChangeEventHandler<HTMLInputElement>
	multiSelect?: Boolean
}

export const Checkbox = ({
	labelText,
	index,
	name,
	checked = false,
	register,
	value,
	error,
	controllerError,
	multiSelect = false,
	renderLabel = true,
	required,
	onChange,
	...props
}: InputProps) => {
	const errorText = (error?.[name]?.message as string) ?? controllerError?.message
	// const [checkState, setCheckState] = useState<boolean>(checked)
	const [checkValue, setCheckValue] = useState<string>()

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { checked } = event.target

		setCheckValue(value)
		onChange?.(event)
		// } else {
		// 	setCheckValue(undefined)
		// 	onChange?.(event)
		// }
	}

	return (
		<div>
			<div className="mt-1 flex items-center space-x-2">
				<input
					{...props}
					type="checkbox"
					name={name}
					onChange={handleChange}
					id={index}
					value={value}
					checked={checked}
					className={clsx('border border-[#0038FF]')}
				/>

				{renderLabel && labelText && (
					<label htmlFor={name} className="block text-sm font-small text-[#0D0C18]">
						{labelText}
					</label>
				)}
				{/* <Image
					onClick={handleChange}
					src={checkState ? checkedBox : uncheckedBox}
					alt="checkbox"
					className="cursor-pointer"
				/> */}
			</div>
			{errorText && <p className="text-xs text-red-600">{errorText}</p>}
		</div>
	)
}
