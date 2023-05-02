import { useRouter } from 'next/router'
import UserForm from 'src/components/users/form'

const updateUser = () => {
	const router = useRouter()
	const { id } = router.query

	return <UserForm title="Edit User" isNew={false} userId={id} />
}

export default updateUser
