import { useRouter } from 'next/router'
import { Container } from 'src/components/app/container'
import { AppHeader } from 'src/components/app/header'
import { AppLayout } from 'src/components/app/layout'
import UserForm from 'src/components/user/form'

const updateUser = () => {
	const router = useRouter()
	const { id } = router.query

	return (
		<AppLayout>
			<AppHeader />
			<Container>
				<UserForm title="Edit User" isNew={false} userId={id as string} />
			</Container>
		</AppLayout>
	)
}

export default updateUser
