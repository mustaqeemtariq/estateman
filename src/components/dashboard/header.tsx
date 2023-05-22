import { Dispatch, SetStateAction, useState } from 'react'
import { DateInput } from '../app/date'
import { Select } from '../app/select'
import { Tabs } from '../app/tabs'

interface DashboardHeaderProps {
	setData: Dispatch<
		SetStateAction<{
			fromDate: string
			toDate: string
			period: string
		}>
	>
}

export const DashboardHeader = ({ setData }: DashboardHeaderProps) => {
	const [showTab, setShowTab] = useState('Dashboard')
	const [duration, setDuration] = useState<string>()

	const tabs = [
		{
			name: 'Dashboard',
			current: showTab == 'Dashboard' ? true : false
		}
	]

	const handleDropdown = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setDuration(event.target.value)
		setData(prev => ({ ...prev, period: event.target.value }))
	}

	const handleFrom = (value: string) => {
		setData(prev => ({ ...prev, fromDate: value }))
	}

	const handleTo = (value: string) => {
		setData(prev => ({ ...prev, toDate: value }))
	}

	return (
		<div className="grid grid-cols-2 gap-x-4">
			<Tabs
				labelText="Dashboard"
				name="Dashboard"
				value="Dashboard"
				setShowTab={setShowTab}
				tabs={tabs}
				className="w-full text-left text-2xl"
			/>
			<div className="flex space-x-2">
				<Select name="period" labelText="SELECT" renderLabel={true} onChange={handleDropdown}>
					<option value="">Select Period</option>
					<option value="period">Period</option>
					<option value="month">Month</option>
					<option value="year">Year</option>
				</Select>
				<DateInput
					onCalendarClick={handleFrom}
					type="date"
					name="from"
					placeholder="Start Date"
					disabled={duration !== 'period'}
					labelText="FROM"
					className="bg-white"
				/>
				<DateInput
					onCalendarClick={handleTo}
					type="date"
					name="to"
					placeholder="End Date"
					disabled={duration !== 'period'}
					labelText="TO"
					className="bg-white"
				/>
			</div>
		</div>
	)
}
