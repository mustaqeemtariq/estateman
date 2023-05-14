import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import moment from 'moment'

interface AlertProps {
	type: string
	date: string
}

export default function Alert({ type, date }: AlertProps) {
	return (
		<div
			className={clsx(
				'w-full bg-opacity-80 text-white',
				type === 'error' ? 'bg-[#FF0000]' : 'bg-[#DC4200]'
			)}>
			<div className="flex justify-between px-3 py-2">
				<div className="flex space-x-2 items-center">
					<ExclamationTriangleIcon className="h-5 w-5" aria-hidden="true" />
					<p>{type === 'error' ? 'Expired on' : 'Expiring on'}</p>
				</div>
				<p>{moment(date).format('DD MMM, YYYY')}</p>
			</div>
		</div>
	)
}
