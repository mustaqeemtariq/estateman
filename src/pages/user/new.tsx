import { Container } from 'src/components/app/container'
import { AppLayout } from 'src/components/app/layout'
import { DashboardHeader } from 'src/components/dashboard/header'
import UserForm from 'src/components/user/form'

const newUser = () => {
	return (
		<AppLayout>
			<Container>
				<DashboardHeader />
				<UserForm title="Add User" isNew={true} />
			</Container>
		</AppLayout>
	)
}

export default newUser
