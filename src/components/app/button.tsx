import clsx from 'clsx'

interface ButtonProps
	extends React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
	return (
		<button
			{...props}
			className={clsx(
				'flex w-full justify-center rounded-md border border-transparent py-3 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2',
				className,
				{
					'pointer-events-none cursor-not-allowed': props.disabled
				}
			)}>
			{children}
		</button>
	)
}
