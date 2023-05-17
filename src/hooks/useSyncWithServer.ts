import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'src/hooks/rtk'

import { saveAuctions, saveProperties, saveUsers } from 'src/slices/db'

import propertyService from 'src/services/property'
import userService from 'src/services/user'
import auctionService from 'src/services/auction'

export const useSyncWithServer = () => {
	const dispatch = useAppDispatch()
	const auth = useAppSelector(state => state.auth)

	const { connected } = useAppSelector(state => state.db)

	useEffect(() => {
		if (!connected) {
			setTimeout(() => {
				propertyService.getAllProperties().then(response => dispatch(saveProperties(response)))
				userService.getAllUsers().then(response => dispatch(saveUsers(response)))
				auctionService.getAllAuctions().then(response => dispatch(saveAuctions(response)))
			}, 500)
		}
	}, [connected, auth])
}
