export const formatCurrency = (text: string) => {
	if (text === '') return ''
	const valueAsNumber = parseInt(text.replace(/,/g, ''))
	const formattedValue = valueAsNumber.toLocaleString()

	return formattedValue
}
