import React from 'react'


interface AppLayoutProps {
	children: React.ReactNode
	title?: string
	renderHeader?: boolean
	renderSidebar?: boolean
	docTitle?: boolean
}

export const AppLayout: React.FC<AppLayoutProps> = ({
	children,
	renderHeader = false,
    ...props
}) => {
	return (
		<div {...props}>
            {children}
		</div>
	)
}
