import Image from 'next/image'
import Link from 'next/link'
import EmptyImage from 'src/assets/card/emptyImage.png'
import { dateDifference } from 'src/utils/date'
import Alert from '../app/alert'

interface BoxCardProps {
	image: string[] | undefined
	contract: string
	title: string
	location: string
	category: string
	occupancy: string | undefined
	expiryDate: string | undefined
}

const PropertyBoxCard = ({
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

	// const [images, setImages] = useState([])

	// useEffect(() => {
	// 	const getPropertyImages = async() => {
	// 		const response = await axios.get('http://localhost:3000/getimageurl?id=645ca4727246afdcb9afd2db')
	// 		setImages(response.data.data)
	// 	}
	// 	getPropertyImages()
	// }, [])

	// let im;
	// useEffect(() => {
	// 	if (images.propertyDetails) {
	// 		im = images.propertyDetails[0]
	// 		console.log(im);
			
	// 	}
	// }, [images])
	

	return (
		<div className="rounded-md border border-gray-300 hover:bg-[#0D0C18]/[85%] hover:shadow-lg relative">
			<div className="relative">
				<Image
					src={EmptyImage}
					width={30}
					height={30}
					alt="cardImage"
					className="w-full max-h-30 max-w-30"
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
					<p className="">{occupancy}</p>
				</div>
			</div>

			<div className="absolute hover:bg-[#0D0C18]/[85%] z-20 top-0 right-0 flex flex-col space-y-3 items-center justify-center h-full w-full opacity-0 hover:opacity-100 transition-opacity">
				<Link href={`/property/view/${title}`}>
					<button className="mx-2 text-black bg-[#FCFDFF] rounded-md px-9 py-2 uppercase">
						View
					</button>
				</Link>
				<Link href={`/property/edit/${title}`}>
					<button className="mx-2 text-white bg-[#DC4200] rounded-md px-10 py-2 uppercase">
						Edit
					</button>
				</Link>
				<Link href={'/property/history'}>
					<button className="mx-2 text-white bg-[#0038FF] rounded-md px-8 py-2">Add History</button>
				</Link>
			</div>
		</div>
	)
}

export default PropertyBoxCard
