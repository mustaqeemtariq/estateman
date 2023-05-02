import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'
import { BanknotesIcon, PlusIcon } from '@heroicons/react/24/outline'
import { Search } from './search-input'

export const AppHeader = () => {
	return (
		<header>
			<h4>
				Welcome <span>User</span>
			</h4>
			<nav className="flex justify-between">
				<Search placeholder="Search Property" className="py-2" />
				<div className="flex items-center space-x-2 bg-white px-6 rounded-md">
					<ExclamationTriangleIcon className="text-[#DC4200] h-5 w-5" />
					<span className="uppercase">Lease Due</span>
				</div>
				<div className="flex items-center space-x-2 bg-white px-6 rounded-md">
					<BanknotesIcon className="text-[#0038FF] h-5 w-5" />
					<span className="uppercase">Total Sales</span>
				</div>
				<div className="flex text-white bg-[#0038FF] rounded-md items-center space-x-2 px-3">
					<PlusIcon className="h-5 w-5" />
					<span className="uppercase">Add User</span>
				</div>
			</nav>
		</header>
	)
}
