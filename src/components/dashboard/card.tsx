import clsx from 'clsx'
import Image, { StaticImageData } from 'next/image'

interface DashboardCardProps {
	name: string
	stats: number
	background: StaticImageData
	count?: number
}

export const DashboardCard = ({ name, stats, background, count }: DashboardCardProps) => {
	return (
		<div
			className={`w-[160px] h-[160px] border border-gray-300 flex items-center justify-center relative`}>
			<div className="mt-2 sm:p-4 space-y-4">
				<h2
					className={clsx(
						'text-5xl font-bold text-[#27325B] text-center',
						count == 3 && 'text-[#C31E1E]'
					)}>
					{stats}
				</h2>
				<h2 className="text-lg font-semibold text-gray-900 text-center uppercase">{name}</h2>
			</div>
			<div className="absolute bottom-0 right-0">
				<Image src={background} alt="card" />
			</div>
		</div>
	)
}
