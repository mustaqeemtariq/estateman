import React from 'react'
import { toast } from 'react-hot-toast'
import * as XLSX from 'xlsx';


interface ImportButtonProps {
	onUpload: (file: File) => void
}

const requiredHeaders = [
	'ContractType',
	'PropertyType',
	'PropertyCategory',
	'LandArea',
	'Units',
	'Price',
	'YearBuilt',
	'Title',
	'Location',
	'City',
	'Housenumber',
	'Streetno',
	'Society',
	'Bed',
	'Bath',
	'Sector',
	'Kitchen',
	'Gas',
	'Electricity',
	'Amount',
	'Cheque',
	'AccountNumber',
	'Branch',
	'Name',
	'ContactNumber',
	'Address',
	'Date',
	'OccupancyStatus',
	'Calltype'
]

const ImportButton = ({ onUpload }: ImportButtonProps) => {

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
				onUpload?.(file)
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
				accept=".xlsx"
				onChange={handleFileUpload}
				className="hidden w-full appearance-none"
			/>
			<button
				type="button"
				className="bg-green-500 absolute right-1 whitespace-nowrap hover:bg-green-600 text-white font-bold py-3 px-4 rounded capitalize"
				onClick={() => {
					const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
					fileInput.click()
				}}>
				Upload Excel File
			</button>
		</div>
	)
}

export default ImportButton
