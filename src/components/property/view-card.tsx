import { ExclamationTriangleIcon, MapPinIcon } from '@heroicons/react/20/solid'
import moment from 'moment'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { BiCurrentLocation } from 'react-icons/bi'
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
import imageService from 'src/services/images'
import { ImagePath, Property } from 'src/types/typings'
import { ImageSlider } from '../app/image-slider'
import { MapComponent } from '../app/map'

interface ViewPropertyCardProps {
	data: Property
}

const ViewPropertyCard = ({ data }: ViewPropertyCardProps) => {
	const details = [
		{ value: data.PropertyDetails?.Bed, image: Bed },
		{ value: data.PropertyDetails?.Bath, image: Shower },
		{ value: data.PropertyDetails?.Kitchen, image: Kitchen },
		{ value: data.PropertyDetails?.Gas, image: Gas },
		{ value: data.PropertyDetails?.Electricity, image: Electricity },
		{ value: data.PropertyDetails?.places, image: Places }
	]

	const [images, setImages] = useState<ImagePath>()

	useEffect(() => {
		const getImages = async () => {
			const response = await imageService.getPropertyImages('64649dcec2f9388d7c103db6')
			setImages(response)
		}
		getImages()
	}, [])

	const [showMap, setShowMap] = useState(false)
	return (
		<div className="grid grid-cols-2 gap-x-6 gap-y-3">
			<div>
				<div className="border-b border-[#717B9D] pb-5">
					<div className="space-y-4">
						<div className="grid grid-cols-4 gap-x-2">
							<div className="space-y-1">
								<p className="text-xs text-[#CED1DC]">Title</p>
								<p>{data.Title}</p>
							</div>
							<div className="space-y-1">
								<p className="text-xs text-[#CED1DC]">Type</p>
								<p className="text-[#0038FF]">{data.PropertyType}</p>
							</div>
							<div className="space-y-1">
								<p className="text-xs text-[#CED1DC]">Category</p>
								<p className="text-[#0038FF]">{data.PropertyCategory}</p>
							</div>
							<div className="space-y-1">
								<p className="text-xs text-[#CED1DC]">Contract Type</p>
								<p className="text-[#0038FF]">{data.ContractType}</p>
							</div>
						</div>
						<div className="flex justify-between">
							<div className="flex items-center space-x-1 text-base">
								<MapPinIcon className="h-4 w-4 fill-[#131128]" aria-hidden="true" />
								<p className="text-[#0D0C18]">{data.Location}</p>
							</div>
							<div
								className="flex items-center space-x-1 text-base cursor-pointer pr-2"
								onClick={() => setShowMap(true)}>
								<BiCurrentLocation className="h-4 w-4" />
								<p className="text-[#0057FF] uppercase">View Map</p>
							</div>
						</div>
						<MapComponent show={showMap} setShow={setShowMap} />
						<div className="flex items-center space-x-1 text-sm">
							<ExclamationTriangleIcon className="h-4 w-4 fill-[#DC4200]" aria-hidden="true" />
							<p>
								Lease Expiring on:{' '}
								<span className="text-[#DC4200]">
									{moment(data?.AddHistory?.LeaseExpiringOn).format('DD MMMM, YYYY')}
								</span>
							</p>
						</div>
					</div>

					<div className="grid grid-cols-3 gap-x-5 gap-y-2 mt-12">
						{details.map((detail, index) => (
							<div key={index} className="flex items-center space-x-1">
								<Image src={detail.image} alt="detail-image" />
								<p>{detail.value}</p>
							</div>
						))}
					</div>
				</div>
				<div className="space-y-1 pt-4">
					<p className="text-[#717B9D] uppercase">Description</p>
					<p className="text-sm">{data?.AddHistory?.AddDetails}</p>
				</div>
			</div>
			<div>
				<ImageSlider type="slider" images={images?.propertyDetails} />
				<div className="flex flex-col mt-4 space-y-2">
					<div className="flex justify-between pr-16">
						<div className="flex flex-col space-y-2">
							<p className="text-[#717B9D] uppercase">Owner:</p>
							<div className="flex items-center space-x-1">
								<Image src={Contact} alt="contact" />
								<p>{data?.OwnerDetails?.Name}</p>
							</div>
						</div>
						<div className="flex flex-col space-y-2">
							<p className="text-[#717B9D] uppercase">Area:</p>
							<div className="flex items-center space-x-1">
								<Image src={Area} alt="area" />
								<p>{data?.LandArea}</p>
							</div>
						</div>
					</div>
					<div>
						<div className="flex items-center space-x-1">
							<Image src={Phone} alt="phone" />
							<p className="text-[#0078FF]">{data.OwnerDetails?.ContactNumber}</p>
						</div>
					</div>
					<div>
						<div className="flex justify-between items-center pr-8">
							<div className="flex items-center space-x-1">
								<Image src={Location} alt="location" />
								<p className="text-sm">{data.OwnerDetails?.Address}</p>
							</div>
							<div className="flex flex-col space-y-2">
								<p className="text-[#717B9D] uppercase">Price (Pkr)</p>
								<div className="flex items-center space-x-1">
									<Image src={Money} alt="money" />
									<p>{data?.Price}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ViewPropertyCard
