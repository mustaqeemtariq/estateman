let fallbackHost: string | undefined = 'localhost:4000'
let host = fallbackHost

let schemeForHttp = 'https://'

if (host === 'localhost:4000') {
	schemeForHttp = 'http://'
}

export const apiHost = schemeForHttp + host
