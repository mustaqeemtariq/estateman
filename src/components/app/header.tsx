import { ExclamationTriangleIcon, LockClosedIcon } from '@heroicons/react/20/solid'
import { BanknotesIcon, PlusIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useAppDispatch, useAppSelector } from 'src/hooks/rtk'
import propertyService from 'src/services/property'
import { logOut } from 'src/slices/auth'
import { Search } from './search-input'

export const AppHeader = () => {
	const { register, handleSubmit } = useForm()

	const dispatch = useAppDispatch()
	const router = useRouter()

	const [totalLease, setTotalLease] = useState(0)

	useEffect(() => {
		const getHeaderData = async () => {
			const leaseResponse = await propertyService.leaseDue()
			setTotalLease(leaseResponse.length)
		}
		getHeaderData()
	}, [])

	const searchProperty = async (title: string) => {
		const response = await propertyService.searchProperty(title.toLowerCase())
		if (response.success == 'false') {
			toast.error('Property not found')
		} else {
			router.push(`/property/view/${title}`)
		}
	}

	const handleSearch = (data: any) => {
		const { title } = data
		searchProperty(title)
	}

	const handleLogout = () => {
		dispatch(logOut())
		router.push('/')
		toast.success('Successfully Logout')
	}

	const { role } = useAppSelector(state => state.auth)

	return (
		<header>
			<div className="flex justify-between mb-4">
				<h4>
					<span className="text-gray-500">Welcome</span> John Smith
				</h4>
				<div className="flex space-x-2 items-center cursor-pointer" onClick={handleLogout}>
					<LockClosedIcon className="h-5 w-5" />
					<span className="uppercase">Log Out</span>
				</div>
			</div>

			<nav
				className={clsx(
					'grid ',
					role === 'surveyor' ? 'grid-cols-4 gap-x-4' : 'grid-cols-5 gap-x-3'
				)}>
				<div className={clsx(role === 'surveyor' ? 'col-span-3' : 'col-span-2')}>
					<form onSubmit={handleSubmit(handleSearch)}>
						<Search
							name="title"
							register={register}
							placeholder="Search Property"
							className={clsx('py-2', role === 'surveyor' && 'sm:w-full')}
						/>
					</form>
				</div>
				<div className="flex w-full items-center space-x-4 bg-white px-2 rounded-md border border-slate-300">
					<ExclamationTriangleIcon className="text-[#DC4200] h-5 w-5" />
					<p className="uppercase">Lease Due</p>
					<span className="text-[#DC4200]">{totalLease}</span>
				</div>
				{role !== 'surveyor' && (
					<div className="flex w-full items-center space-x-2 bg-white px-2 rounded-md border border-slate-300">
						<BanknotesIcon className="text-[#0038FF] h-5 w-5" />
						<span className="uppercase">Total Sales</span>
					</div>
				)}
				{role !== 'surveyor' && (
					<div className="w-full flex items-center text-white bg-[#0038FF] rounded-md px-2 border border-slate-300">
						<Link href={'/user/new'} className="flex items-center space-x-4">
							<PlusIcon className="h-5 w-5" />
							<span className="uppercase">Add User</span>
						</Link>
					</div>
				)}
			</nav>
		</header>
	)
}
