import { Container } from 'src/components/app/container'
import { AppHeader } from 'src/components/app/header'
import { AppLayout } from 'src/components/app/layout'
import UserForm from 'src/components/user/form'

const newUser = () => {
	return (
		<AppLayout>
			<AppHeader />
			<Container>
				<UserForm title="Add User" isNew={true} />
			</Container>
		</AppLayout>
	)
}

export default newUser
