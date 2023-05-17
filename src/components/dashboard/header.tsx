import { useState } from 'react'
import { Select } from '../app/select'
import { Tabs } from '../app/tabs'

export const DashboardHeader = () => {
	const [showTab, setShowTab] = useState('Dashboard')

	const tabs = [
		{
			name: 'Dashboard',
			current: showTab == 'Dashboard' ? true : false
		}
	]

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
				<Select name="period" labelText="SELECT" renderLabel={true}>
					<option value="">Select Period</option>
					<option value="period">Period</option>
					<option value="month">Month</option>
					<option value="year">Year</option>
				</Select>
				<Select name="period" labelText="FROM" renderLabel={true}>
					<option value="">Select Period</option>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
				</Select>
				<Select name="period" labelText="TO" renderLabel={true}>
					<option value="">Select Period</option>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
				</Select>
			</div>
		</div>
	)
}
