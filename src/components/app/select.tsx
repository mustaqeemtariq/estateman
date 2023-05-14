import clsx from 'clsx'

import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

interface SelectProps
	extends React.DetailedHTMLProps<
		React.SelectHTMLAttributes<HTMLSelectElement>,
		HTMLSelectElement
	> {
	children: React.ReactNode
	labelText?: string
	required?: boolean
	index?: string
	errors?: FieldErrors<FieldValues>
	renderLabel?: boolean
	name: string
	register?: UseFormRegister<any>
}

export const Select: React.FC<SelectProps> = ({
	labelText,
	errors,
	renderLabel,
	index,
	children,
	required,
	register,
	name,
	className,
	...restProp
}) => {
	const errorText = errors?.[name]?.message as string

	return (
		<div className="relative w-full">
			<label htmlFor="location" className="block text-gray-900">
				{labelText} {required && <span style={{ color: 'red' }}>*</span>}
			</label>
			<select
				{...restProp}
				{...(register?.(name) ?? {})}
				className={clsx(
					'mt-1 block w-full rounded-md border-0 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 sm:text-sm sm:leading-6 outline-none',
					className
				)}>
				{children}
			</select>

			{errorText && <p className="text-xs text-red-600">{errorText}</p>}
		</div>
	)
}
