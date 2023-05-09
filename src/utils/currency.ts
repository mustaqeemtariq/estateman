export const formatCurrency = (text: string) => {
	if (text === '') return ''
	if (text.match(/^[0-9,]+$/)){
		const valueAsNumber = parseInt(text.replace(/,/g, ''))
		const formattedValue = valueAsNumber.toLocaleString()
		return formattedValue
	}
}
