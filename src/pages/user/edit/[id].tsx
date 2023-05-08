import { GetServerSidePropsContext } from 'next'
import { Container } from 'src/components/app/container'
import { AppHeader } from 'src/components/app/header'
import { AppLayout } from 'src/components/app/layout'
import UserForm from 'src/components/user/form'
import userService from 'src/services/user'
import { User } from 'src/types/typings'

interface UpdateUserProps {
	user: User
}

const updateUser = ({ user }: UpdateUserProps) => {
	return (
		<AppLayout>
			<AppHeader />
			<Container>
				<UserForm title="Edit User" isNew={false} data={user} />
			</Container>
		</AppLayout>
	)
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
	const { id } = ctx.query
	const response = await userService.getUserById(typeof id == 'string' ? id : '')
	return {
		props: {
			user: response
		}
	}
}

export default updateUser
