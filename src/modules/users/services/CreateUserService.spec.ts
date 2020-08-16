import FakeCreateUsersRepository from '@modules/users/Repositories/fakes/FakeUserRepository'
import FakeHashProvider from '@modules/users/providers/HashProviders/fakes/FakeHashProvider'
import CreateUserService from './CreateUserService'
import AppError from '@shared/errors/AppError'

describe('CreateUserService', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeCreateUsersRepository()
    const fakeHashProvider = new FakeHashProvider()
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    )

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'john.doe@exemple.com',
      password: '123456'
    })

    expect(user).toHaveProperty('id')
  })

  it('should not be able to create two users with the same e-mail', async () => {
    const fakeUsersRepository = new FakeCreateUsersRepository()
    const fakeHashProvider = new FakeHashProvider()
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    )

    await createUser.execute({
      name: 'John Doe',
      email: 'john.doe@exemple.com',
      password: '123456'
    })

    expect(
      createUser.execute({
        name: 'John Doe',
        email: 'john.doe@exemple.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})