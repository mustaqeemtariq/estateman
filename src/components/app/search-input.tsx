import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { InputHTMLAttributes } from 'react'
import { UseFormRegister } from 'react-hook-form'

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
	register?: UseFormRegister<any>
	name?: string
}

export const Search = ({
	register,
	name = 'title',
	className,
	placeholder,
	...restProp
}: SearchInputProps) => {
	return (
		<div>
			<div className="relative rounded-md">
				<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
					<MagnifyingGlassIcon
						className="h-8 w-8 pr-2 text-black decoration-solid"
						aria-hidden="true"
					/>
				</div>
				<input
					type="search"
					{...(register?.(name) ?? {})}
					{...restProp}
					id="search"
					className={clsx(
						'block rounded-md pl-10 p-[15px] outline-none border-slate-300 border text-base sm:w-[380px]',
						className?.includes('p') ? className : 'py-[12px]'
					)}
					placeholder={placeholder ?? 'Search...'}
					autoComplete="off"
				/>
			</div>
		</div>
	)
}
