import { ExclamationTriangleIcon, LockClosedIcon } from '@heroicons/react/20/solid'
import { BanknotesIcon, PlusIcon } from '@heroicons/react/24/outline'
import { Search } from './search-input'

export const AppHeader = () => {
	return (
		<header>
			<div className="flex justify-between mb-4">
				<h4>
					<span className="text-gray-500">Welcome</span> John Smith
				</h4>
				<div className="flex space-x-2 items-center">
					<LockClosedIcon className="h-5 w-5" />
					<span className="uppercase">Log Out</span>
				</div>
			</div>

			<nav className="flex justify-between">
				<Search placeholder="Search Property" className="py-2" />
				<div className="flex items-center space-x-2 bg-white px-8 rounded-md border border-slate-300">
					<ExclamationTriangleIcon className="text-[#DC4200] h-5 w-5" />
					<span className="uppercase">Lease Due</span>
				</div>
				<div className="flex items-center space-x-2 bg-white px-8 rounded-md border border-slate-300">
					<BanknotesIcon className="text-[#0038FF] h-5 w-5" />
					<span className="uppercase">Total Sales</span>
				</div>
				<div className="flex text-white bg-[#0038FF] rounded-md items-center space-x-2 px-8 border border-slate-300">
					<PlusIcon className="h-5 w-5" />
					<span className="uppercase">Add User</span>
				</div>
			</nav>
		</header>
	)
}
