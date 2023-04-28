import { InputHTMLAttributes } from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	labelText?: string
	name: string
	index?: string
	register?: UseFormRegister<any>
	errors?: FieldErrors<any>
	renderLabel?: boolean
	onChange?: React.ChangeEventHandler<HTMLInputElement>
}

export const Input = ({
	labelText,
	index,
	name,
	register,
	errors,
	renderLabel = true,
	onChange,
	...props
}: InputProps) => {
	const errorText = errors?.[name]?.message as string

	return (
		<div>
			{renderLabel && labelText && (
				<label htmlFor={name} className="block text-sm font-small text-[#717B9D]">
					{labelText}
				</label>
			)}
			<div className="mt-1">
				<input
					{...(register?.(name) ?? {})}
					onChange={onChange}
					id={index}
					className="block w-full appearance-none bg-[#E6E6E6] rounded-md border border-gray-300 p-3 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    {...props}
				/>
			</div>
			{errorText && <p className="text-xs text-red-600">{errorText}</p>}
		</div>
	)
}

export const Checkbox = ({
	labelText,
	name,
	register,
    errors,
	checked,
	renderLabel = true,
	...props
}: InputProps) => {

    const errorText = errors?.[name]?.message as string

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
            {errorText && <p className="text-xs text-red-600">{errorText}</p>}
		</div>
	)
}
