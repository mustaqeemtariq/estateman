import { CalendarIcon, ExclamationTriangleIcon, MapPinIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import { BiCurrentLocation } from 'react-icons/bi'
import EmptyImage from 'src/assets/card/emptyImage.png'
import Image1 from 'src/assets/card/pexels-binyamin-mellish-1500459 1.png'
import Area from 'src/assets/view/Area.png'
import Contact from 'src/assets/view/Contacts.png'
import Money from 'src/assets/view/Dollar Place Marker.png'
import Place from 'src/assets/view/Place Marker.png'
import Phone from 'src/assets/view/iPhone X.png'
import { ImageSlider } from '../app/image-slider'

const ViewAuctionCard = () => {
	const images = [Image1, EmptyImage, Image1, EmptyImage, Image1, EmptyImage]
	return (
		<div className="grid grid-cols-2 gap-x-6 gap-y-3">
			<div className="space-y-4">
				<div className="flex justify-between">
					<div className="space-y-1">
						<p className="text-xs text-[#CED1DC]">Title</p>
						<p className="whitespace-nowrap text-semibold">500 sq yd phase 2</p>
					</div>
					<div className="space-y-1">
						<p className="text-xs text-[#CED1DC]">Society</p>
						<p className="text-semibold">DHA</p>
					</div>
				</div>
				<div className="flex justify-between">
					<div className="flex items-center space-x-1 text-base">
						<MapPinIcon className="h-4 w-4 fill-[#717B9D]" aria-hidden="true" />
						<p className="text-[#0D0C18]">110, Street 8, DHA 2</p>
					</div>
					<div className="flex items-center space-x-1 text-base">
						<BiCurrentLocation className="h-4 w-4" />
						<p className="text-[#0057FF] uppercase">View Map</p>
					</div>
				</div>
				<div className="flex items-center space-x-1 text-base">
					<Image src={Area} alt="area" />
					<p>1000 Sqft</p>
				</div>
				<div className="flex items-center space-x-1 text-base">
					<CalendarIcon className="h-4 w-4 fill-[#DC4200]" aria-hidden="true" />
					<p>
						Auction On: <span className="text-[#DC4200]">March 08, 2023 02:30 PM</span>
					</p>
				</div>
				<div className="flex items-center space-x-1 text-base">
					<ExclamationTriangleIcon className="h-4 w-4 fill-[#717B9D]" aria-hidden="true" />
					<p className="text-[#717B9D]">
						Auctioneer: <span className="text-black">Govt</span>
					</p>
				</div>
				<div className="flex items-center space-x-1 text-base">
					<Image src={Place} alt="place" />
					<p className="text-[#717B9D]">
						Auction: <span className="text-black">On Site</span>
					</p>
				</div>
				<div className="flex justify-center space-x-28">
					<div className="space-y-1">
						<p className="text-[#717B9D]">Outstanding (Pkr)</p>
						<div className="flex items-center space-x-1">
							<Image src={Money} alt="money" />
							<p className="whitespace-nowrap text-semibold">10,000,000</p>
						</div>
					</div>
					<div className="space-y-1">
						<p className="text-[#717B9D]">Reserve Price (Pkr)</p>
						<div className="flex items-center space-x-1">
							<Image src={Money} alt="money" />
							<p className="whitespace-nowrap text-semibold">96,000000</p>
						</div>
					</div>
				</div>
				<div className="grid grid-col-2">
					<div className="flex flex-col space-y-2">
						<div className="flex items-center space-x-1">
							<Image src={Contact} alt="contact" />
							<p>Ahmad Ali</p>
						</div>
						<div className="flex items-center space-x-1">
							<Image src={Phone} alt="phone" />
							<p className="text-[#0038FF]">0300 7654321</p>
						</div>
					</div>
				</div>
			</div>
			<div className="h-full">
				<ImageSlider type="slider" images={images} />
			</div>
		</div>
	)
}

export default ViewAuctionCard
