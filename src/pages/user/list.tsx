import clsx from 'clsx'
import { useMemo, useState } from 'react'

import { PencilSquareIcon, TrashIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { AppLayout } from 'src/components/app/layout'
import { Search } from 'src/components/app/search-input'
import { Table } from 'src/components/app/table'

let userList = [
    {
        username: "Mustaqeem",
        email: "mustaqeem@gmail.com",
        phone: "03331245432"
    },
    {
        username: "Usama",
        email: "mustaqeem@gmail.com",
        phone: "03331245432"
    },
    {
        username: "Ali",
        email: "mustaqeem@gmail.com",
        phone: "03331245432"
    },
    {
        username: "Hassan",
        email: "mustaqeem@gmail.com",
        phone: "03331245432"
    },
    {
        username: "Ahmad",
        email: "mustaqeem@gmail.com",
        phone: "03331245432"
    },
    {
        username: "Mukamal",
        email: "mustaqeem@gmail.com",
        phone: "03331245432"
    },
    {
        username: "Muzaffar",
        email: "mustaqeem@gmail.com",
        phone: "03331245432"
    },
    {
        username: "Kamal",
        email: "mustaqeem@gmail.com",
        phone: "03331245432"
    },
    {
        username: "Qasim",
        email: "mustaqeem@gmail.com",
        phone: "03331245432"
    },
    {
        username: "Hamza",
        email: "mustaqeem@gmail.com",
        phone: "03331245432"
    }
]

const ListUsers = () => {

	const [users, setUsers] = useState<User[]>(userList)
    const [searchText, setSearchText] = useState('')

    const { filteredUsers } = useMemo(() => {
		const { filteredUsers } = users.reduce(
			(prev, curr) => {
				if (searchText) {
					if (curr.username.toLowerCase().includes(searchText.toLowerCase())) {
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
	}, [users, searchText])


	const renderPeopleTBody = (users: User[]) => {
		return (
			<tbody className="bg-white">
				{users.map((user,index) => (
					<tr key={user.username+index} className={clsx(index % 2 === 0 && 'bg-gray-100')}>
						<td className='tw-table-td hidden'>{index + 1}</td>
						<td className="tw-table-td">{user.username}</td>
						<td className="tw-table-td text-blue-500 hover:underline">{user.email}</td>
						<td className="tw-table-td">{user.phone}</td>
                        <td className='tw-table-td text-blue-500'>
							<Link href={`/user/edit/${index + 1}`}>
                            <PencilSquareIcon className='h-6 w-6' aria-hidden='true'/>
							</Link>
                        </td>
                        <td className='tw-table-td text-red-500'>
                            <TrashIcon className='h-6 w-6' aria-hidden='true'/>
                        </td>
					</tr>
				))}
			</tbody>
		)
	}
	return (
		<AppLayout>
            <div className='px-4 sm:px-4 lg:px-4 flex justify-between items-center py-8'>
			<div className="sm:flex sm:items-centertext-base">
				<div className="sm:flex-auto">
					<h1 className="font-semibold leading-6 text-[#0038FF] text-xl uppercase">All Users</h1>
				</div>
			</div>

            <div className="flex flex-col md:flex-row space-x-0 md:space-x-2 space-y-2 md:space-y-0 justify-between">
				<Search
                    placeholder='Search User'
					onChange={({ target }) => setSearchText(target.value)}
					className="w-80 md:w-62 p-4 placeholder:text-gray-900"
				/>
			</div>
            </div>
			<div className="mt-6 flow-root overflow-hidden rounded-lg">
				<div className="-my-2 -mx-4 overflow-x-auto  sm:-mx-6 lg:-mx-8">
					<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
						<div>
							<Table
								headers={[
									'Username',
									'Email',
									'Contact #',
									'Edit',
									'Delete'
								]}
								items={filteredUsers}
								renderComponent={renderPeopleTBody}
							/>
						</div>
					</div>
				</div>
			</div>
		</AppLayout>
	)
}

export default ListUsers