import { PencilSquareIcon, TrashIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Container } from 'src/components/app/container'
import { AppHeader } from 'src/components/app/header'
import { AppLayout } from 'src/components/app/layout'

import { Search } from 'src/components/app/search-input'
import { Table } from 'src/components/app/table'
import userService from 'src/services/user'
import { User } from 'src/types/typings'

interface UserProps {
	usersData: User[]
}

const ListUsers = ({ usersData }: UserProps) => {
	const [searchText, setSearchText] = useState('')

	const deleteUser = async (id: string) => {
		const response = await userService.deleteUser(id)
		if (response.success) {
			toast.success('User deleted successfully')
		}
	}

	const { filteredUsers } = useMemo(() => {
		const { filteredUsers } = usersData.reduce(
			(prev, curr) => {
				if (searchText) {
					if (
						curr.Username.toLowerCase().includes(searchText.toLowerCase()) ||
						curr.Email.toLowerCase().includes(searchText.toLowerCase()) ||
						curr.Contact.includes(searchText)
					) {
						return { filteredUsers: [...prev.filteredUsers, curr] }
					}
				} else {
					return { filteredUsers: [...prev.filteredUsers, curr] }
				}

				return prev
			},
			{
				filteredUsers: [] as User[]
			}
		)
		return { filteredUsers }
	}, [usersData, searchText])

	const renderPeopleTBody = (userData: User[]) => {
		return (
			<tbody className="bg-white">
				{userData.map((user, index) => (
					<tr key={user.Username + index} className={clsx(index % 2 === 0 && 'bg-gray-100')}>
						<td className="tw-table-td hidden">{user.id}</td>
						<td className="tw-table-td">{user.Username}</td>
						<td className="tw-table-td text-blue-500 hover:underline">{user.Email}</td>
						<td className="tw-table-td">{user.Contact}</td>
						<td className="tw-table-td text-blue-500">
							<Link href={`/user/edit/${user.id}`}>
								<PencilSquareIcon className="h-6 w-6" aria-hidden="true" />
							</Link>
						</td>
						<td className="tw-table-td text-red-500">
							<TrashIcon
								onClick={() => deleteUser(user.id)}
								className="h-6 w-6 cursor-pointer"
								aria-hidden="true"
							/>
						</td>
					</tr>
				))}
			</tbody>
		)
	}
	return (
		<AppLayout>
			<AppHeader />
			<Container>
				<div className="flex justify-between items-center">
					<div className="sm:flex sm:items-centertext-base">
						<div className="sm:flex-auto">
							<h1 className="font-semibold leading-6 text-[#0038FF] text-xl uppercase">
								All Users
							</h1>
						</div>
					</div>

					<div className="flex flex-col md:flex-row space-x-0 md:space-x-2 space-y-2 md:space-y-0 justify-between">
						<Search
							placeholder="Search User"
							onChange={({ target }) => setSearchText(target.value)}
							className="w-80 md:w-62 py-2 placeholder:text-gray-900"
						/>
					</div>
				</div>
				<div className="mt-6 flow-root overflow-hidden rounded-lg">
					<div className="-my-2 -mx-4 overflow-x-auto  sm:-mx-6 lg:-mx-8">
						<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
							<div>
								<Table
									headers={['Username', 'Email', 'Contact #', 'Edit', 'Delete']}
									items={filteredUsers}
									renderComponent={renderPeopleTBody}
								/>
							</div>
						</div>
					</div>
				</div>
			</Container>
		</AppLayout>
	)
}

export const getStaticProps = async () => {
	const response = await userService.getAllUsers()
	return {
		props: {
			usersData: response
		}
	}
}

export default ListUsers
