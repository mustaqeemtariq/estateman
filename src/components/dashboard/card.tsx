import { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react'

interface HomeCardProps {
	name: string
	stats: number
	background?: ForwardRefExoticComponent<
		Omit<SVGProps<SVGSVGElement>, 'ref'> & {
			title?: string | undefined
			titleId?: string | undefined
		} & RefAttributes<SVGSVGElement>
	>
}

export const HomeCard = ({ name, stats, background }: HomeCardProps) => {
	return (
		<div
			className={`w-[160px] h-[160px] border border-gray-300 flex items-center justify-center bg-[${background}] bg-no-repeat bg-center`}>
			<div className="mt-2 sm:p-4">
				<h2 className="text-2xl text-[#27325B] text-center">{stats}</h2>
				<h2 className="text-lg font-semibold text-gray-900 text-center uppercase">{name}</h2>
			</div>
		</div>
	)
}
