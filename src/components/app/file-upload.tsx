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

const FileUpload = ({ labelText, required, onUpload, name, placeholder, ...props }: InputProps) => {
	const [files, setFiles] = useState<File[]>([])

	const validFileTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf']

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newFiles = Array.from(e.target.files!).filter(file => validFileTypes.includes(file.type))
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
					className="hidden placeholder-[#0D0C18] w-full appearance-none bg-[#E6E6E6] rounded-md border border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
					accept=".jpg,.jpeg,.png,.gif,.pdf"
					title="Upload image file"
					multiple
					onChange={handleInputChange}
				/>
				<input
					className="block placeholder-[#0D0C18] w-full appearance-none bg-[#E6E6E6] rounded-md border border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
					placeholder={placeholder}
					disabled
				/>
				<button
					className="bg-[#717B9D] absolute right-1 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded capitalize"
					onClick={() => {
						const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
						fileInput.click()
					}}>
					Upload
				</button>
			</div>
			{files.length > 0 && (
				<div className="flex rounded-md space-x-2 mt-1 flex-wrap">
					{files.map((file, index) => (
						<img
							src={URL.createObjectURL(files[index])}
							alt="uploaded file"
							className="max-w-20 max-h-20"
						/>
					))}
				</div>
			)}
		</div>
	)
}

export default FileUpload
