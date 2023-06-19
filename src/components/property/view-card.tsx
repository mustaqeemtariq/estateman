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
import { dateDifference } from 'src/utils/date'

interface ViewPropertyCardProps {
	data: Property[],
	propertyId: string | null,
}



const ViewPropertyCard = ({ data, propertyId }: ViewPropertyCardProps) => {
	console.log(data);
	const details = [
		{ value: data[0].PropertyDetails?.Bed, image: Bed },
		{ value: data[0].PropertyDetails?.Bath, image: Shower },
		{ value: data[0].PropertyDetails?.Kitchen, image: Kitchen },
		{ value: data[0].PropertyDetails?.Gas, image: Gas },
		{ value: data[0].PropertyDetails?.Electricity, image: Electricity },
		{ value: data[0].PropertyDetails?.places, image: Places }
	]

	// const [images, setImages] = useState<string[]>([])

	// useEffect(() => {
	// 	const getImages = async () => {
	// 		const response = await imageService.getPropertyImages(propertyId ?? '')
	// 		setImages(response.propertyDetails)
	// 	}
	// 	getImages()
	// }, [])

	const [showMap, setShowMap] = useState(false)

	return (
		<div className="grid grid-cols-2 gap-x-6 gap-y-3">
			<div>
				<div className="border-b border-[#717B9D] pb-5">
					<div className="space-y-4">
						<div className="grid grid-cols-4 gap-x-2">
							<div className="space-y-1">
								<p className="text-xs text-[#CED1DC]">Title</p>
								<p>{data[0]?.Title}</p>
							</div>
							<div className="space-y-1">
								<p className="text-xs text-[#CED1DC]">Type</p>
								<p className="text-[#0038FF]">{data[0]?.PropertyType}</p>
							</div>
							<div className="space-y-1">
								<p className="text-xs text-[#CED1DC]">Category</p>
								<p className="text-[#0038FF]">{data[0]?.PropertyCategory}</p>
							</div>
							<div className="space-y-1">
								<p className="text-xs text-[#CED1DC]">Contract Type</p>
								<p className="text-[#0038FF]">{data[0]?.ContractType}</p>
							</div>
						</div>
						<div className="flex justify-between">
							<div className="flex items-center space-x-1 text-base">
								<MapPinIcon className="h-4 w-4 fill-[#131128]" aria-hidden="true" />
								<p className="text-[#0D0C18]">{data[0]?.Location}</p>
							</div>
							<div
								className="flex items-center space-x-1 text-base cursor-pointer pr-2"
								onClick={() => setShowMap(true)}>
								<BiCurrentLocation className="h-4 w-4" />
								<p className="text-[#0057FF] uppercase">View Map</p>
							</div>
						</div>
						{showMap && <MapComponent show={showMap} setShow={setShowMap} />}
						<div className="flex items-center space-x-1 text-sm">
							<ExclamationTriangleIcon className="h-4 w-4 fill-[#DC4200]" aria-hidden="true" />
							{dateDifference(data[0]?.AddHistory[0]?.LeaseExpiringOn ?? '') < 0 ?
							<p>
							Lease Expired on:
								<span className="text-[#FF0000]">
								{data[0]?.AddHistory[0]?.LeaseExpiringOn ? moment(data[0]?.AddHistory[0]?.LeaseExpiringOn).format('DD MMMM, YYYY') : ''}
								</span>
							</p>
							:
							<p>
								Lease Expiring on:
								<span className="text-[#DC4200]">
									{data[0]?.AddHistory[0]?.LeaseExpiringOn ? moment(data[0]?.AddHistory[0]?.LeaseExpiringOn).format('DD MMMM, YYYY') : ''}
								</span>
							</p>
						}
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
					<p className="text-sm">{data[0]?.AddHistory[0]?.AddDetails}</p>
				</div>
			</div>
			<div>
				<ImageSlider type="slider" images={data[0]?.PropertyDetails?.imagePath} />
				<div className="flex flex-col mt-4 space-y-2">
					<div className="flex justify-between pr-16">
						<div className="flex flex-col space-y-2">
							<p className="text-[#717B9D] uppercase">Owner:</p>
							<div className="flex items-center space-x-1">
								<Image src={Contact} alt="contact" />
								<p>{data[0]?.OwnerDetails?.Name}</p>
							</div>
						</div>
						<div className="flex flex-col space-y-2">
							<p className="text-[#717B9D] uppercase">Area:</p>
							<div className="flex items-center space-x-1">
								<Image src={Area} alt="area" />
								<p>{data[0]?.LandArea}</p>
							</div>
						</div>
					</div>
					<div>
						<div className="flex items-center space-x-1">
							<Image src={Phone} alt="phone" />
							<p className="text-[#0078FF]">{data[0].OwnerDetails?.ContactNumber}</p>
						</div>
					</div>
					<div>
						<div className="flex justify-between items-center pr-8">
							<div className="flex items-center space-x-1">
								<Image src={Location} alt="location" />
								<p className="text-sm">{data[0].OwnerDetails?.Address}</p>
							</div>
							<div className="flex flex-col space-y-2">
								<p className="text-[#717B9D] uppercase">Price (Pkr)</p>
								<div className="flex items-center space-x-1">
									<Image src={Money} alt="money" />
									<p>{data[0]?.Price}</p>
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
