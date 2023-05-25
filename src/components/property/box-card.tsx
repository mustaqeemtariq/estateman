import clsx from 'clsx'
import Link from 'next/link'
import { useAppSelector } from 'src/hooks/rtk'
import { dateDifference } from 'src/utils/date'
import Alert from '../app/alert'
import { UserRightTypes } from 'src/constants/constants'
import Image, { StaticImageData } from 'next/image'

interface BoxCardProps {
	id: string
	image: string | StaticImageData
	contract: string
	title: string
	location: string
	category: string
	occupancy: string | undefined
	expiryDate: string | undefined
}

const PropertyBoxCard = ({
	id,
	image,
	contract,
	title,
	location,
	category,
	occupancy,
	expiryDate
}: BoxCardProps) => {
	const difference = dateDifference(expiryDate ?? '')
	let type
	if (difference < 0) {
		type = 'error'
	} else if (difference <= 1) {
		type = 'warning'
	}

	const { username, Roles } = useAppSelector(state => state.auth)
	const users = useAppSelector(state => state.db.users)
	const user = Object.values(users).filter(user => user.Username === username)
	let rights = [UserRightTypes.ADD, UserRightTypes.EDIT, UserRightTypes.VIEW]
	if (Roles === 'surveyor' && user.length > 0) {
		rights = user[0].rights
	}

	return (
		<div className="rounded-md border border-gray-300 hover:bg-[#0D0C18]/[85%] hover:shadow-lg relative">
			<div className="relative">
				<Image
					loader={({src}) => src}
					src={image}
					width={30}
					height={30}
					alt="cardImage"
					className="w-full max-h-48 max-w-48"
				/>
				{type && (
					<div className="absolute w-full bottom-0">
						<Alert type={type} date={expiryDate ?? ''} />
					</div>
				)}
			</div>

			<div className="p-4">
				<p className="text-[#0038FF]">{contract}</p>
				<p className="font-bold">{title}</p>
				<p className="whitespace-nowrap">{location}</p>
				<div className="flex justify-between">
					<p>{category}</p>
					<p
						className={clsx(
							'font-semibold',
							occupancy === 'Not Sold' && 'text-[#058019]',
							occupancy === 'Sold' && 'text-[#0B124D]',
							occupancy === 'Vacant' && 'text-[#DC4200]',
							occupancy === 'Occupied' && 'text-[#000000]'
						)}>
						{occupancy}
					</p>
				</div>
			</div>

			<div className="absolute hover:bg-[#0D0C18]/[85%] z-20 top-0 right-0 flex flex-col space-y-3 items-center justify-center h-full w-full opacity-0 hover:opacity-100 transition-opacity">
				{rights.includes(UserRightTypes.VIEW) && <Link href={`/property/view/${title}?propertyId=${id}`}>
					<button className="mx-2 text-black bg-[#FCFDFF] rounded-md px-9 py-2 uppercase">
						View
					</button>
				</Link>}
				{rights.includes(UserRightTypes.EDIT) && (
					<Link href={`/property/edit?title=${title}`}>
						<button className="mx-2 text-white bg-[#DC4200] rounded-md px-10 py-2 uppercase">
							Edit
						</button>
					</Link>
				)}
				<Link href={'/property/history'}>
					<button className="mx-2 text-white bg-[#0038FF] rounded-md px-8 py-2">Add History</button>
				</Link>
			</div>
		</div>
	)
}

export default PropertyBoxCard
