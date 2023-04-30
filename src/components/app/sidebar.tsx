import {
    Bars3Icon,
    XMarkIcon
} from '@heroicons/react/24/outline'
import clsx from 'clsx'

import { Disclosure } from '@headlessui/react'
import { BuildingOfficeIcon, HomeIcon, UserIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Logo from 'src/assets/logo/em-logo.png'

interface SidebarProps {
	children: React.ReactNode
}

export const Sidebar: React.FC<SidebarProps> = ({ children }) => {
	
	const navigation = [
		{ name: 'Home', icon: HomeIcon, current: true, href: '/' },
		{
			name: 'User',
			icon: UserIcon,
            href: '/user',
			current: false,
			children: [
				{ name: 'All Users', href: '/user/list' },
				{ name: 'Add User', href: '/user/new' }
			]
		},
        {
			name: 'Property Listing',
			icon: BuildingOfficeIcon,
            href: '/property',
			current: false,
			children: [
				{ name: 'View All Properties', href: '/property' },
				{ name: 'Lease (Rental)', href: '/lease' },
                { name: 'On Sale', href: '/sale' },
                { name: 'Add Property', href: '/add' },
			]
		},
        {
			name: 'Auctions',
			icon: BuildingOfficeIcon,
            href: '/auction',
			current: false,
			children: [
				{ name: 'View All Auctions', href: '/auctions' },
				{ name: 'Add Auction', href: '/auctions' }
			]
		},
		{
			name: 'Signed Lease (Rental)',
			icon: BuildingOfficeIcon,
			current: false,
			href: '/lease'
		},
		{
			name: 'Units Sold',
			icon: BuildingOfficeIcon,
			current: false,
			href: '/units'
		}
	]

    const {pathname} = useRouter()

    console.log(pathname);
    
	const [showSidebar, setShowSidebar] = useState(false)


	return (
		<div className="px-2">
			<div className="md:hidden">
				<div className="flex items-center justify-between bg-white py-3 px-4">
					<Image src={Logo} className="rounded-md w-32" alt="logo" />
					<button
						type="button"
						className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
						onClick={() => setShowSidebar(!showSidebar)}>
						<span className="sr-only">{showSidebar ? 'Close sidebar' : 'Open sidebar'}</span>
						{showSidebar ? (
							<XMarkIcon className="h-6 w-6" aria-hidden="true" />
						) : (
							<Bars3Icon className="h-6 w-6" aria-hidden="true" />
						)}
					</button>
				</div>
			</div>
			<div className="hidden md:fixed md:inset-y-0 md:flex md:w-72 md:flex-col">
				<div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
					<div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
						<div className="flex flex-shrink-0 items-center px-4 mb-4">
                        <Image src={Logo} className="rounded-md w-32" alt="logo" />
						</div>
						<div>
							<nav className="flex-1 space-y-1 bg-white px-2" aria-label="Sidebar">
								{navigation.map(item =>
									!item.children ? (
										<div key={item.name}>
											<Link
												href={item.href}
												className={
													clsx(
														'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
														pathname === item.href
															? 'bg-gray-100 text-blue-600 font-medium hover:bg-[#E9ECFF]'
															: 'text-gray-600 hover:bg-[#E9ECFF] hover:text-gray-900'
													)
												}>
													<>
														<item.icon
															className={clsx(
																'mr-3 h-6 w-6 flex-shrink-0',
																pathname === item.href
																	? 'text-blue-600'
																	: 'text-gray-600 group-hover:text-gray-500'
															)}
															aria-hidden="true"
														/>
														{item.name}
													</>
											</Link>
										</div>
									) : (
										<Disclosure
											as="div"
											key={item.name}
											className="space-y-1"
											defaultOpen={pathname.includes(item.href)}>
											<Disclosure.Button
												className={({ open }) =>
													clsx(
														'group flex w-full items-center rounded-md py-2 pl-2 pr-1 text-left text-sm font-medium focus:outline-none',
														open
															? 'bg-gray-100 text-blue-600 font-medium hover:bg-[#E9ECFF]'
															: 'text-gray-600 hover:bg-[#E9ECFF] hover:text-gray-900'
													)
												}>
												{({ open }) => (
													<>
														<item.icon
															className={clsx(
																'mr-3 h-6 w-6 flex-shrink-0  ',
																open
																	? 'text-blue-600 group-hover:text-blue-500'
																	: 'text-gray-600 group-hover:text-gray-500'
															)}
															aria-hidden="true"
														/>

														<span className="flex-1">{item.name}</span>

														<svg
															className={clsx(
																'ml-3 h-4 w-5 mr-3 flex-shrink-0 transform transition-colors duration-150 ease-in-out group-hover:text-gray-400',
																open ? 'rotate-180 text-gray-400' : 'text-gray-300'
															)}
															viewBox="0 0 330 330"
															aria-hidden="true">
															<path d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z" />
														</svg>
													</>
												)}
											</Disclosure.Button>
											<Disclosure.Panel className="space-y-1">
												{item.children.map(subItem => (
													<Link
														key={subItem.name}
														href={subItem.href}
														className={
															clsx(
																'group flex w-full items-center rounded-md py-2 pl-11 pr-2 text-sm font-medium',
																pathname === subItem.href
																	? 'bg-gray-100 text-blue-600 font-medium hover:bg-[#E9ECFF]'
																	: 'text-gray-600 hover:bg-[#E9ECFF] hover:text-gray-900'
															)
														}>
														{subItem.name}
													</Link>
												)
                                                )}
											</Disclosure.Panel>
										</Disclosure>
									)
								)}
							</nav>
						</div>
					</div>
				</div>
			</div>
			{showSidebar && (
				<div className="md:hidden">
					<nav className="bg-white px-2 pt-2 pb-3 space-y-1">
						{navigation.map(item =>
							!item.children ? (
								<div key={item.name}>
									<Link
										href={item.href}
										className={
											clsx(
												'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
												pathname === item.href
													? 'bg-gray-100 text-blue-600 font-medium hover:bg-[#E9ECFF]'
													: 'text-gray-600 hover:bg-[#E9ECFF] hover:text-gray-900'
											)
										}>
											<>
												<item.icon
													className={clsx(
														'mr-3 h-6 w-6 flex-shrink-0',
														pathname === item.href ? 'text-blue-600' : 'text-gray-600 group-hover:text-gray-500'
													)}
													aria-hidden="true"
												/>
												{item.name}
											</>
									</Link>
								</div>
							) : (
								<Disclosure
									as="div"
									key={item.name}
									className="space-y-1"
									defaultOpen={pathname.includes(item.href)}>
									<Disclosure.Button
										className={({ open }) =>
											clsx(
												'group flex w-full items-center rounded-md py-2 pl-2 pr-1 text-left text-sm font-medium focus:outline-none',
												open
													? 'bg-gray-100 text-blue-600 font-medium hover:bg-[#E9ECFF]'
													: 'text-gray-600 hover:bg-[#E9ECFF] hover:text-gray-900'
											)
										}>
										{({ open }) => (
											<>
												<item.icon
													className={clsx(
														'mr-3 h-6 w-6 flex-shrink-0  ',
														open
															? 'text-blue-600 group-hover:text-blue-500'
															: 'text-gray-600 group-hover:text-gray-500'
													)}
													aria-hidden="true"
												/>

												<span className="flex-1">{item.name}</span>

												<svg
													className={clsx(
														'ml-3 h-4 w-5 mr-3 flex-shrink-0 transform transition-colors duration-150 ease-in-out group-hover:text-gray-400',
														open ? 'rotate-180 text-gray-400' : 'text-gray-300'
													)}
													viewBox="0 0 330 330"
													aria-hidden="true">
													<path d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z" />
												</svg>
											</>
										)}
									</Disclosure.Button>
									<Disclosure.Panel className="space-y-1">
										{item.children.map(subItem => (
											<Link
												key={subItem.name}
												href={subItem.href}
												className={
													clsx(
														'group flex w-full items-center rounded-md py-2 pl-11 pr-2 text-sm font-medium',
														pathname === subItem.href
															? 'bg-gray-100 text-blue-600 font-medium hover:bg-[#E9ECFF]'
															: 'text-gray-600 hover:bg-[#E9ECFF] hover:text-gray-900'
													)
												}>
												{subItem.name}
											</Link>
										))}
									</Disclosure.Panel>
								</Disclosure>
							)
						)}
					</nav>
				</div>
			)}

			<main>
				<div className="py-6 px-6 sm:px-8 lg:px-10 md:ml-72">{children}</div>
			</main>
		</div>
	)
}