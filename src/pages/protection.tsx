import type { AppProps } from 'next/app'
import { NextRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAppSelector } from 'src/hooks/rtk'
import { useSyncWithServer } from 'src/hooks/useSyncWithServer'
import Login from './auth/login'

interface ProtectionProps {
	router: NextRouter
	Component: React.ComponentType<AppProps>
	pageProps: AppProps
}

const Protection = ({ Component, pageProps }: ProtectionProps) => {
	const isLoggedIn = useAppSelector(state => state.auth.accessToken)
	const [loggedIn, setLoggedIn] = useState(true)
	useSyncWithServer()

	useEffect(() => {
		if (isLoggedIn) {
			setLoggedIn(true)
		} else if (!isLoggedIn) {
			setLoggedIn(false)
		}
	}, [isLoggedIn])
	return (
		<>
			{loggedIn ? <Component {...pageProps} /> : null}
			{!loggedIn && <Login />}
		</>
	)
}

export default Protection
