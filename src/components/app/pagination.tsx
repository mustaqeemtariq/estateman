import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

interface PaginationProps {
    items?: Array<any>
    itemsPerPage?: number
    renderComponent: (item: any) => JSX.Element
    totalSelectedPages?: number
}

const DEFAULT_PAGE_INDEX = 0

export const Pagination = ({
    items,
    renderComponent,
}: PaginationProps) => {
    const [pageIndex, setPageIndex] = useState(DEFAULT_PAGE_INDEX)
    const [itemsPerPage, setItemsPerPage] = useState(8)

    const sliceStart = pageIndex * itemsPerPage
    const sliceEnd = sliceStart + itemsPerPage

    const [currItems, setCurrItems] = useState(items?.slice(sliceStart, sliceEnd))

    const numberOfBottomPages = Math.ceil((items ?? []).length / itemsPerPage)

    useEffect(() => {
        if (currItems?.length == 0) {
            setPageIndex(numberOfBottomPages - 1)
        }
    }, [currItems])

    useEffect(() => {
        // Length changes if a filter is applied,
        // So we have to paginate the results again
        setCurrItems(items?.slice(sliceStart, sliceEnd))
    }, [items, items?.length, sliceStart, sliceEnd, pageIndex])

    useEffect(() => {
        setCurrItems(items?.slice(sliceStart, sliceEnd))
    }, [pageIndex])

    const totalPages = Math.ceil((items ?? []).length / itemsPerPage)

    const onNext = () => {
        if (pageIndex < totalPages - 1) {
            setPageIndex(index => index + 1)
        }
    }

    const onPrevious = () => {
        if (pageIndex - 1 >= 0) {
            setPageIndex(index => index - 1)
        }
    }
    const onFirst = () => {
        setPageIndex(0)
    }
    return (
        <>
            {renderComponent(currItems)}
            <tfoot className="table-footer-group">
                <tr>
                    <td colSpan={200}>
                        <div className="flex items-center  bg-[#FAFAFA] px-4 py-2 sm:px-6">
                            <div className="flex flex-1 justify-center sm:hidden px-2">
                                <button className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    Previous
                                </button>
                                <button className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    Next
                                </button>
                            </div>
                            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center ">
                                <button
                                    className={clsx(
                                        'relative inline-flex items-center rounded-l-md  px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20',
                                        pageIndex == 0 && 'disabled text-gray-400'
                                    )}
                                    onClick={onPrevious}
                                    onDoubleClick={onFirst}>
                                    <ChevronLeftIcon className="h-5 w-5 text-blue-500" aria-hidden="true" />
                                    <span className="sr-only">Previous</span>
                                </button>
                                <div>
                                    <p className="text-base text-gray-700 whitespace-nowrap">
                                        Page <span className='py-1 px-2 mr-1 ml-1 bg-white border border-gray-300 outline-none'>{pageIndex+1}</span>
                                        of <span className="font-medium"> {numberOfBottomPages} </span>
                                    </p>
                                </div>
                                <button
                                    className={clsx(
                                        'relative inline-flex items-center rounded-r-md px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20',
                                        totalPages == pageIndex + 1 && 'disabled text-gray-400'
                                    )}
                                    onClick={onNext}>
                                    <span className="sr-only">Next</span>
                                    <ChevronRightIcon className="h-5 w-5 text-blue-500" aria-hidden="true" />
                                </button>
                            </div>
                        </div>
                    </td>
                </tr>
            </tfoot>
        </>
    )
}
