import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import store from 'src/store'
import 'src/styles/globals.css'
import Protection from './protection'

export default function App({ Component, pageProps, router }: AppProps) {
	let persistor = persistStore(store)

	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<Toaster
					position={'top-right'}
					toastOptions={{
						style: {
							margin: '15px',
							background: '#828282',
							color: '#fff',
							width: '340px'
						},
						className: 'text-base',
						duration: 3000,
						error: {icon: '⚠️'}
					}}
				/>
				<Protection Component={Component} pageProps={pageProps} router={router} />
			</PersistGate>
		</Provider>
	)
}
