import clsx from 'clsx'

interface ContainerProps {
	className?: string
	children: React.ReactNode
}

export const Container: React.FC<ContainerProps> = ({ className, ...props }) => {
	return (
		<div
			className={clsx(
				'relative z-50 mx-auto rounded-lg drop-shadow-2xl bg-white p-6 mt-12',
				className
			)}
			{...props}
		/>
	)
}
