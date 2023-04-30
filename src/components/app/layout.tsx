import React from 'react'
import { Sidebar } from './sidebar'


interface AppLayoutProps {
	children: React.ReactNode
	title?: string
	renderHeader?: boolean
	renderSidebar?: boolean
}

export const AppLayout: React.FC<AppLayoutProps> = ({
	children,
	renderHeader = false,
	renderSidebar = true,
    ...props
}) => {
	return (
		<div {...props}>
            {renderSidebar ? <Sidebar>{children}</Sidebar> : <>{children}</>}
		</div>
	)
}
