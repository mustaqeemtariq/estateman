interface User {
	username: string
	email: string
	phone: string
}

type UserForm = User & {
    cnic: string
	address: string
	password: string
    confirmPassword: string
	address: string
	rights: string[]
}
