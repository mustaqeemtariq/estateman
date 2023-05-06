import clsx from 'clsx'
import { Dispatch, SetStateAction } from 'react'

interface Tab {
	name: string
	current: boolean
}

interface TabsProps {
	labelText: string
	name: string
	value: string
	setShowTab: Dispatch<SetStateAction<string>>
	tabs: Tab[]
	className?: string
	active: {
		propertyDetails: boolean
		addHistory: boolean
	}
}

export const Tabs = ({
	labelText,
	name,
	value,
	tabs,
	setShowTab,
	className,
	active
}: TabsProps) => {
	return (
		<div className="w-full">
			<div className="sm:hidden">
				<label htmlFor={name} className="sr-only">
					{labelText}
				</label>
				<select id={name} name={name} defaultValue={value}>
					{tabs.map(tab => (
						<option key={tab.name}>{tab.name}</option>
					))}
				</select>
			</div>
			<div className="hidden sm:block">
				<div>
					<nav className="-mb-px flex border-b border-gray-400" aria-label="Tabs">
						{tabs.map((tab, index) => (
							<button
								onClick={() => {
									index == 0 && setShowTab(tab.name)
									index == 1 && active.propertyDetails && setShowTab(tab.name)
									index == 2 && active.addHistory && setShowTab(tab.name)
								}}
								key={tab.name}
								className={clsx(
									tab.current
										? 'border-indigo-500 text-gray-900 text-2xl'
										: 'border-transparent text-gray-400 text-lg',
									'hoverborder-gray-300 hover:text-gray-700 font-small',
									'whitespace-nowrap border-b-4 py-4 px-6 font-medium uppercase ',
									className
								)}
								aria-current={tab.current ? 'page' : undefined}>
								{tab.name}
							</button>
						))}
					</nav>
				</div>
			</div>
		</div>
	)
}
