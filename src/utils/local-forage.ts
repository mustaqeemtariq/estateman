import localForage from 'localforage'

const db = localForage.createInstance({
	driver: localForage.INDEXEDDB,
	name: 'estateman-db',
	storeName: 'estateman',
	size: 500 * 1024 * 1024, // 524 MBs
	description: 'Estateman DB'
})

export const indexedStorageDB = {
	db,
	getItem: db.getItem,
	setItem: db.setItem,
	removeItem: db.removeItem,
	clear: db.clear
}
