import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import Image, { StaticImageData } from 'next/image'
import { useState } from 'react'

interface ImageSliderProps {
	images: string[] | undefined
	type: string
}

export const ImageSlider = ({ images, type }: ImageSliderProps) => {
	const [currentIndex, setCurrentIndex] = useState(0)

	const handleSlider = (index: number) => {
		setCurrentIndex(index)
	}

	const visibleImages = images?.slice(currentIndex, currentIndex + 5)

	return (
		<div className="relative flex items-center justify-center">
			{type === 'slider' && (
				<img src={images?.[currentIndex]} alt="slider" className="h-60 w-full" />
			)}
			<div className="flex items-center space-x-1">
				{type === 'arrow' && (
					<div className="justify-start">
						<ChevronLeftIcon
							onClick={() => setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : currentIndex)}
							className={clsx(
								'h-6 w-6 fill-[#717B9D] opacity-0',
								currentIndex > 0 && 'opacity-100 cursor-pointer'
							)}
							aria-hidden="true"
						/>
					</div>
				)}

				<div className="flex space-x-2 justify-center ">
					{type === 'arrow' &&
						visibleImages?.map(image => (
							<Image src={image} alt="card-image" className="h-20 w-20 " />
						))}
				</div>
				{type === 'arrow' && (
					<ChevronRightIcon
						onClick={() =>
							setCurrentIndex(
								images ? (currentIndex + 5 < images?.length - 1 ? currentIndex + 1 : currentIndex) : currentIndex
							)
						}
						className={clsx(
							'h-6 w-6 fill-[#717B9D] opacity-0',
							images && (currentIndex + 5 < images?.length - 1) && 'opacity-100 cursor-pointer'
						)}
						aria-hidden="true"
					/>
				)}
			</div>
			{type === 'slider' && (
				<div className="bg-[#0D0C18]/[75%] w-fit absolute rounded-[30px] flex items-center space-x-2 px-4 py-2 mx-auto bottom-2">
					{images?.map((image, index) => (
						<div
							key={index}
							className={clsx(
								'h-3 w-3 rounded-full cursor-pointer',
								index === currentIndex ? 'bg-[#D9D9D9]' : "bg-[#D9D9D9]/[75%]"
							)}
							onClick={() => handleSlider(index)}></div>
					))}
				</div>
			)}
		</div>
	)
}
