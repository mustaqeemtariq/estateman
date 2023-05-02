import React from 'react'
import { AppHeader } from './header'
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
	renderSidebar = true
}) => {
	return (
		<div>
			{renderHeader ? <AppHeader /> : null}
			{renderSidebar ? <Sidebar>{children}</Sidebar> : <>{children}</>}
		</div>
	)
}
