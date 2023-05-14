import { ExclamationTriangleIcon, MapPinIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import { BiCurrentLocation } from 'react-icons/bi'
import EmptyImage from 'src/assets/card/emptyImage.png'
import Image1 from 'src/assets/card/pexels-binyamin-mellish-1500459 1.png'
import Area from 'src/assets/view/Area.png'
import Bed from 'src/assets/view/Bedroom.png'
import Places from 'src/assets/view/Cart.png'
import Contact from 'src/assets/view/Contacts.png'
import Money from 'src/assets/view/Dollar Place Marker.png'
import Electricity from 'src/assets/view/Electricity.png'
import Gas from 'src/assets/view/Gas.png'
import Kitchen from 'src/assets/view/Kitchen Light.png'
import Location from 'src/assets/view/Place Marker.png'
import Shower from 'src/assets/view/Shower.png'
import Phone from 'src/assets/view/iPhone X.png'
import { ImageSlider } from '../app/image-slider'

const ViewCard = () => {
	const details = [
		{ value: 2, image: Bed },
		{ value: 2, image: Shower },
		{ value: 1, image: Kitchen },
		{ value: 'Yes', image: Gas },
		{ value: 'Yes', image: Electricity },
		{ value: 'Grocers', image: Places }
	]

	const images = [Image1, EmptyImage, Image1, EmptyImage, Image1, EmptyImage]
	return (
		<div className="grid grid-cols-2 gap-x-6 gap-y-3">
			<div>
				<div className="border-b border-[#717B9D] pb-5">
					<div className="space-y-4">
						<div className="grid grid-cols-4 gap-x-2">
							<div className="space-y-1">
								<p className="text-xs text-[#CED1DC]">Title</p>
								<p className="whitespace-nowrap">3 bed basement</p>
							</div>
							<div className="space-y-1">
								<p className="text-xs text-[#CED1DC]">Type</p>
								<p className="text-[#0038FF]">Residential</p>
							</div>
							<div className="space-y-1">
								<p className="text-xs text-[#CED1DC]">Category</p>
								<p className="text-[#0038FF]">House</p>
							</div>
							<div className="space-y-1">
								<p className="text-xs text-[#CED1DC]">Contract Type</p>
								<p className="text-[#0038FF]">For Rent</p>
							</div>
						</div>
						<div className="flex justify-between">
							<div className="flex items-center space-x-1 text-base">
								<MapPinIcon className="h-4 w-4 fill-[#131128]" aria-hidden="true" />
								<p className="text-[#0D0C18]">06, Str 27, Park Towers, phase2, DHA</p>
							</div>
							<div className="flex items-center space-x-1 text-base">
								<BiCurrentLocation className="h-4 w-4" />
								<p className="text-[#0057FF] uppercase">View Map</p>
							</div>
						</div>
						<div className="flex items-center space-x-1 text-sm">
							<ExclamationTriangleIcon className="h-3.5 w-3.5 fill-[#DC4200]" aria-hidden="true" />
							<p>
								Lease Expiring on: <span className="text-[#DC4200]">31 January, 2023</span>
							</p>
						</div>
					</div>

					<div className="grid grid-cols-3 gap-x-5 gap-y-2 mt-12">
						{details.map(detail => (
							<div className="flex items-center space-x-1">
								<Image src={detail.image} alt="detail-image" />
								<p>{detail.value}</p>
							</div>
						))}
					</div>
				</div>
				<div className="space-y-1 pt-4">
					<p className="text-[#717B9D] uppercase">Description</p>
					<p className="text-sm">
						First Owner, New building A budget-friendly 5 Marla basement for rent in E-11,
						Islamabad. It consists of 2 bedrooms, 2 washrooms, a TV lounge, a kitchen, a dining and
						drawing room and a car parking space. The neighboring sectors are F-10 and F-11.
					</p>
				</div>
			</div>
			<div>
				<ImageSlider type="slider" images={images} />
				<div className="flex flex-col mt-4 space-y-2">
					<div className="flex justify-between">
						<div className="flex flex-col space-y-2">
							<p className="text-[#717B9D] uppercase">Owner:</p>
							<div className="flex items-center space-x-1">
								<Image src={Contact} alt="contact" />
								<p>Ahmad Ali</p>
							</div>
						</div>
						<div className="flex flex-col space-y-2">
							<p className="text-[#717B9D] uppercase">Area:</p>
							<div className="flex items-center space-x-1">
								<Image src={Area} alt="area" />
								<p>10000 sqft</p>
							</div>
						</div>
					</div>
					<div>
						<div className="flex items-center space-x-1">
							<Image src={Phone} alt="phone" />
							<p className="text-[#0078FF]">0300 7652145</p>
						</div>
					</div>
					<div>
						<div className="flex justify-between items-center">
							<div className="flex items-center space-x-1">
								<Image src={Location} alt="location" />
								<p className="text-sm">H# 203, st 12, NPF, E 11/2, Islamabad</p>
							</div>
							<div className="flex flex-col space-y-2">
								<p className="text-[#717B9D] uppercase">Price (Pkr)</p>
								<div className="flex items-center space-x-1">
									<Image src={Money} alt="money" />
									<p>50,000</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ViewCard
