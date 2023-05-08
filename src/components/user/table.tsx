import { ReactElement } from 'react'

import { Pagination } from 'src/components/app/pagination'

type TableParams = {
	headers: string[]
	items: any
	renderComponent: (item: any) => ReactElement<any, any>
}

export const Table = ({ headers, items, renderComponent }: TableParams) => {
	return (
		<table className="min-w-full table-fixed">
			<thead>
				<tr>
					{headers.map((header, index) => (
						<th key={header + index} scope="col" className="text-sm lg:text-base tw-table-th">
							{header}
						</th>
					))}
				</tr>
			</thead>
			<Pagination items={items} renderComponent={renderComponent} />
		</table>
	)
}
