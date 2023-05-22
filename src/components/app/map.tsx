import { MapPinIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import GoogleMapReact from 'google-map-react'
import { Dispatch, SetStateAction, useState } from 'react'

interface MapComponentProps {
	onChange?: (lat: number, lng: number) => void
	setShow: Dispatch<SetStateAction<boolean>>
	show: boolean
	lat?: number
	lng?: number
	isDisabled?: boolean
}

interface MarkerProps {
	lat: number
	lng: number
}

const Marker = ({ lat, lng }: MarkerProps) => (
	<MapPinIcon className="h-5 w-5 fill-red-500" aria-hidden="true" />
)

export const MapComponent = ({
	isDisabled = true,
	show,
	setShow,
	onChange,
	lat,
	lng
}: MapComponentProps) => {
	const [location, setLocation] = useState({ lat: 0, lng: 0 })

	const handleMapClick = (event: any) => {
		const { lat, lng } = event
		setLocation({ lat, lng })
		onChange?.(lat, lng)
		setShow(false)
	}

	return (
		<div className={clsx(!show && 'hidden')} style={{ height: '400px', width: '100%' }}>
			<GoogleMapReact
				bootstrapURLKeys={{ key: 'AIzaSyCbOobz-eShsFo7BaB4BkwOafME7TC2vCc' }}
				yesIWantToUseGoogleMapApiInternals
				defaultCenter={{ lat: lat ?? 33.6844, lng: lng ?? 73.0479 }}
				defaultZoom={10}
				onClick={handleMapClick}>
				<Marker lat={location.lat} lng={location.lng} />
			</GoogleMapReact>
		</div>
	)
}
