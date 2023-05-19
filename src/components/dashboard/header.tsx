import { useState } from 'react'
import { DateInput } from '../app/date'
import { Select } from '../app/select'
import { Tabs } from '../app/tabs'

export const DashboardHeader = () => {
	const [showTab, setShowTab] = useState('Dashboard')
	const [duration, setDuration] = useState<string>()
	const [from, setFrom] = useState<string>()
	const [to, setTo] = useState<string>()

	const tabs = [
		{
			name: 'Dashboard',
			current: showTab == 'Dashboard' ? true : false
		}
	]

	const handleDropdown = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setDuration(event.target.value)
	}

	const handleFrom = (value: string) => {
		setFrom(value)
	}

	const handleTo = (value: string) => {
		setTo(value)
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
					disabled={duration !== 'period'}
					labelText="FROM"
					className="bg-white"
				/>
				<DateInput
					onCalendarClick={handleTo}
					type="date"
					name="to"
					disabled={duration !== 'period'}
					labelText="TO"
					className="bg-white"
				/>
			</div>
		</div>
	)
}
