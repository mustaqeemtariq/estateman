interface BoxCardProps {
	image: string[] | undefined
	contract: string
	title: string
	location: string
	category: string
	occupancy: string
}

const PropertyBoxCard = ({
	image,
	contract,
	title,
	location,
	category,
	occupancy
}: BoxCardProps) => {
	return (
		<div className="rounded-md border border-gray-300 hover:bg-[#0D0C18]/[85%] hover:shadow-lg relative">
			{image && image.length > 0 ? (
				<img src={image[1]} width={20} height={20} alt="cardImage" className="w-full max-h-20" />
			) : (
				<div className="w-full h-40 bg-gray-500"></div>
			)}

			<div className="p-4">
				<p className="text-[#0038FF]">{contract}</p>
				<p className="font-bold">{title}</p>
				<p className="whitespace-nowrap">{location}</p>
				<div className="flex justify-between">
					<p>{category}</p>
					<p className="">{occupancy}</p>
				</div>
			</div>

			<div className="absolute hover:bg-[#0D0C18]/[85%] z-20 top-0 right-0 flex flex-col space-y-3 items-center justify-center h-full w-full opacity-0 hover:opacity-100 transition-opacity">
				<button className="mx-2 text-black bg-[#FCFDFF] rounded-md px-9 py-2 uppercase">
					View
				</button>
				<button className="mx-2 text-white bg-[#DC4200] rounded-md px-10 py-2 uppercase">
					Edit
				</button>
				<button className="mx-2 text-white bg-[#0038FF] rounded-md px-8 py-2">Add History</button>
			</div>
		</div>
	)
}

export default PropertyBoxCard
