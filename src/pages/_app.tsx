import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { store } from 'src/store'
import 'src/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
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
						duration: 3000
					}}
				/>
			<Component {...pageProps} />
		</Provider>
	)
}
