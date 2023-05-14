export const dateDifference = (dateValue: string) => {
	const presentDate = new Date()
	const sentDate = new Date(dateValue)
	const yearDiff = sentDate.getFullYear() - presentDate.getFullYear()
	const monthDiff = sentDate.getMonth() - presentDate.getMonth()
	const dayDiff = sentDate.getDate() - presentDate.getDate()
	let totalMonthDiff = yearDiff * 12 + monthDiff
	if (dayDiff < 0) {
		totalMonthDiff--
	}
	return totalMonthDiff
}
