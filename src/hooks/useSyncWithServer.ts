import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'src/hooks/rtk'

import { saveProperties, saveUsers } from 'src/slices/db'

import propertyService from 'src/services/property'
import userService from 'src/services/user'

export const useSyncWithServer = () => {
	const dispatch = useAppDispatch()
	const auth = useAppSelector(state => state.auth)

	const { connected } = useAppSelector(state => state.db)
	console.log('S', connected)

	useEffect(() => {
		if (!connected) {
			setTimeout(() => {
				propertyService.getAllProperties().then(response => dispatch(saveProperties(response)))
				userService.getAllUsers().then(response => dispatch(saveUsers(response)))
			}, 500)
		}
	}, [connected, auth])
}
