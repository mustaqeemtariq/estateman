import Image from 'next/image'
import { InputHTMLAttributes, useState } from 'react'
import { FieldError, FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	name: string
	labelText?: string
	index?: string
	register?: UseFormRegister<any>
	error?: FieldErrors<FieldValues>
	controllerError?: FieldError | undefined
	required?: boolean
	onUpload: (files: File[]) => void
}

const FileUpload = ({
	labelText,
	required,
	onUpload,
	name,
	error,
	placeholder,
	...props
}: InputProps) => {
	const [files, setFiles] = useState<File[]>([])

	const validFileTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf']

	let errorText = error?.[name]?.message as string

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newFiles = Array.from(e.target.files!).filter(file => validFileTypes.includes(file.type))
		if (files.length + newFiles.length > 10) {
			errorText = 'You can upload only up to 10 files.'
			return
		}
		setFiles([...files, ...newFiles])
		onUpload([...files, ...newFiles])
	}

	return (
		<div className="w-full">
			{labelText && (
				<label htmlFor={name} className="block text-[#0D0C18]">
					{labelText} {required && <span style={{ color: 'red' }}>*</span>}
				</label>
			)}
			<div className="mt-1 relative flex items-center">
				<input
					{...props}
					type="file"
					className="hidden w-full appearance-none"
					accept=".jpg,.jpeg,.png,.gif,.pdf"
					title="Upload image file"
					multiple
					onChange={handleInputChange}
				/>
				<input
					className="block placeholder-gray-500 w-full appearance-none bg-[#E6E6E6] rounded-md border border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
					placeholder={placeholder}
					disabled
				/>
				<button
					type="button"
					className="bg-[#717B9D] absolute right-1 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded capitalize"
					onClick={() => {
						const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
						fileInput.click()
					}}>
					Upload
				</button>
			</div>
			{files.length > 0 && (
				<div className="flex rounded-md space-x-2 mt-1 overflow-x-auto">
					{files.map((file, index) => (
						<div key={file.toString()} className="relative max-w-20 max-h-20">
							<Image
								src={URL.createObjectURL(files[index])}
								alt="uploaded file"
								width={100}
								height={100}
								className="h-20"
							/>
							<button
								type="button"
								className="absolute top-0 right-0 bg-gray-200 rounded-full text-red-500 hover:text-red-600"
								onClick={() => {
									const newFiles = [...files]
									newFiles.splice(index, 1)
									setFiles(newFiles)
								}}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									className="w-5 h-5">
									<path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
								</svg>
							</button>
						</div>
					))}
				</div>
			)}
			{errorText && <p className="text-xs text-red-600">{errorText}</p>}
		</div>
	)
}

export default FileUpload
