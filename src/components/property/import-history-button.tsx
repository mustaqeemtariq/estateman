import clsx from 'clsx';
import React from 'react'
import { toast } from 'react-hot-toast'
import * as XLSX from 'xlsx';


interface ImportButtonProps {
	disabled?: boolean
	onHistoryUpload?: (file: File) => void
}

const ImportHistoryButton = ({ onHistoryUpload, disabled }: ImportButtonProps) => {

	const requiredHeaders = [
        'Amount',
        'Cheque',	
        'AccountNumber',
        'Branch',	
        'Date',	
        'OccupancyStatus',	
        'Calltype',
        'AddDetails',
        'LeaseExpirngOn'
	]	

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { files } = event.target
		const file = files?.[0]

		if (!file) return

		const reader = new FileReader();
		reader.onload = (event) => {
			const data = new Uint8Array(event.target?.result as ArrayBuffer);
			const workbook = XLSX.read(data, { type: 'array' });
			const worksheet = workbook.Sheets[workbook.SheetNames[0]];
			const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
	
			if (rows.length > 0) {
			const firstRow = rows[0] as any
			const missingColumns = requiredHeaders.filter((header) => !firstRow.includes(header))
			if (missingColumns.length > 0) {
				toast.error(`Following columns are missing: ${missingColumns.join(', ')}`)
			}
			else {
				onHistoryUpload?.(file)
			}
			}
		};
		reader.readAsArrayBuffer(file);
		event.target.value = ''
	}

	return (
		<div className="relative">
			<input
				type="file"
                name='upload-history'
				accept=".xlsx"
				onChange={handleFileUpload}
				className="hidden w-full appearance-none"
			/>
			<button
				type="button"
                disabled={disabled}
				className={clsx("absolute right-1 whitespace-nowrap text-white font-bold py-3 px-4 rounded capitalize", disabled ? 'bg-gray-300' : 'bg-green-500 hover:bg-green-600')}
				onClick={() => {
					const fileInput = document.querySelector('input[name="upload-history"]') as HTMLInputElement
					fileInput.click()
				}}>
				Upload History
			</button>
		</div>
	)
}

export default ImportHistoryButton
