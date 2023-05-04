import { useRouter } from 'next/router'
import { Container } from 'src/components/app/container'
import { AppLayout } from 'src/components/app/layout'
import { DashboardHeader } from 'src/components/dashboard/header'
import UserForm from 'src/components/user/form'

const updateUser = () => {
	const router = useRouter()
	const { id } = router.query

	return (
		<AppLayout>
			<Container>
				<DashboardHeader />
				<UserForm title="Edit User" isNew={false} userId={id} />
			</Container>
		</AppLayout>
	)
}

export default updateUser
