let fallbackHost: string | undefined = 'es-be.symcloud.net'
let host = fallbackHost

let schemeForHttp = 'https://'

if (host === 'localhost:3000') {
	schemeForHttp = 'http://'
}

export const apiHost = schemeForHttp + host
