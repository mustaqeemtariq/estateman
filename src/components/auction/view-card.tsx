import { CalendarIcon, ExclamationTriangleIcon, MapPinIcon } from '@heroicons/react/20/solid'
import moment from 'moment'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { BiCurrentLocation } from 'react-icons/bi'
import Area from 'src/assets/view/Area.png'
import Contact from 'src/assets/view/Contacts.png'
import Money from 'src/assets/view/Dollar Place Marker.png'
import Place from 'src/assets/view/Place Marker.png'
import Phone from 'src/assets/view/iPhone X.png'
import imageService from 'src/services/images'
import { Auction } from 'src/types/typings'
import { ImageSlider } from '../app/image-slider'
import { MapComponent } from '../app/map'

interface ViewAuctionCardProps {
	data: Auction[]
}

const ViewAuctionCard = ({ data }: ViewAuctionCardProps) => {
	const [images, setImages] = useState<string[]>()

	useEffect(() => {
		const getImages = async () => {
			const response = await imageService.getAuctionImages('6465d41f36cdb83e3ac8050d')
			setImages(response)
		}
		getImages()
	}, [])

	const [showMap, setShowMap] = useState(false)
	return (
		<div className="grid grid-cols-2 gap-x-6 gap-y-3">
			<div className="space-y-4">
				<div className="flex justify-between">
					<div className="space-y-1">
						<p className="text-xs text-[#CED1DC]">Title</p>
						<p className="whitespace-nowrap text-semibold">{data[0].Title}</p>
					</div>
					<div className="space-y-1 pr-14">
						<p className="text-xs text-[#CED1DC]">Society</p>
						<p className="text-semibold">{data[0].Society}</p>
					</div>
				</div>
				<div className="flex justify-between">
					<div className="flex items-center space-x-1 text-base">
						<MapPinIcon className="h-4 w-4 fill-[#717B9D]" aria-hidden="true" />
						<p className="text-[#0D0C18]">{data[0].Location}</p>
					</div>
					<div
						className="flex items-center space-x-1 text-base cursor-pointer"
						onClick={() => setShowMap(true)}>
						<BiCurrentLocation className="h-4 w-4" />
						<p className="text-[#0057FF] uppercase">View Map</p>
					</div>
					<MapComponent show={showMap} setShow={setShowMap} />
				</div>
				<div className="flex items-center space-x-1 text-base">
					<Image src={Area} alt="area" />
					<p>{data[0].LandArea}</p>
				</div>
				<div className="flex items-center space-x-1 text-base">
					<CalendarIcon className="h-4 w-4 fill-[#DC4200]" aria-hidden="true" />
					<p>
						Auction On:
						<span className="text-[#DC4200]">
							{moment(data[0].AuctionDateandTime).format('MMMM DD, YYYY h:mm A')}
						</span>
					</p>
				</div>
				<div className="flex items-center space-x-1 text-base">
					<ExclamationTriangleIcon className="h-4 w-4 fill-[#717B9D]" aria-hidden="true" />
					<p className="text-[#717B9D]">
						Auctioneer: <span className="text-black">{data[0].Auctioneer}</span>
					</p>
				</div>
				<div className="flex items-center space-x-1 text-base">
					<Image src={Place} alt="place" />
					<p className="text-[#717B9D]">
						Auction: <span className="text-black">{data[0].PlaceofAuction}</span>
					</p>
				</div>
				<div className="flex justify-center space-x-28">
					<div className="space-y-1">
						<p className="text-[#717B9D]">Outstanding (Pkr)</p>
						<div className="flex items-center space-x-1">
							<Image src={Money} alt="money" />
							<p className="whitespace-nowrap text-semibold">{data[0].Balance}</p>
						</div>
					</div>
					<div className="space-y-1">
						<p className="text-[#717B9D]">Reserve Price (Pkr)</p>
						<div className="flex items-center space-x-1">
							<Image src={Money} alt="money" />
							<p className="whitespace-nowrap text-semibold">{data[0].ReservePrice}</p>
						</div>
					</div>
				</div>
				<div className="grid grid-col-2">
					<div className="flex flex-col space-y-2">
						<div className="flex items-center space-x-1">
							<Image src={Contact} alt="contact" />
							<p>{data[0].ContactPerson}</p>
						</div>
						<div className="flex items-center space-x-1">
							<Image src={Phone} alt="phone" />
							<p className="text-[#0038FF]">{data[0].ContactNumber}</p>
						</div>
					</div>
				</div>
			</div>
			<div className="h-full">
				<ImageSlider type="slider" images={images} page="auction" />
			</div>
		</div>
	)
}

export default ViewAuctionCard
