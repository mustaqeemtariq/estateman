import GoogleMapReact from 'google-map-react'

interface MapProps {
	onChange: (lat: number, lng: number) => void
}

export const Map: React.FC<MapProps> = ({ onChange }) => {
	const handleMapClick = (event: any) => {
		const { lat, lng } = event
		onChange(lat, lng)
	}

	return (
		<div style={{ height: '400px', width: '100%' }}>
			<GoogleMapReact
				bootstrapURLKeys={{ key: 'AIzaSyCbOobz-eShsFo7BaB4BkwOafME7TC2vCc' }}
				defaultCenter={{ lat: 37.7749, lng: -122.4194 }}
				defaultZoom={12}
				onClick={handleMapClick}>	
			</GoogleMapReact>
		</div>
	)
}
