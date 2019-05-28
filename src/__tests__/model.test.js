import Model from '../model'

const UserSchema = {
  firstName: {
    type: 'string',
    required: false,
    rules: [],
  },
  lastName: {
    type: 'string',
    required: false,
    rules: [],
  },
  email: {
    type: 'string',
    required: true,
    rules: ['email'],
  },
}

const UserConfig = {
  name: 'users',
  identifier: {
    field: 'id',
    type: 'number',
    autoincrement: true,
  },
  schema: UserSchema,
}
describe('The Model', () => {
  it('should create a model and set a property', () => {
    const User = Model(UserConfig)

    const newUser = User.create({
      firstName: 'Test',
      lastName: 'Name',
      email: 'test@example.com',
    })
    expect(newUser.isDirty).toBe(false)
    newUser.lastName = 'Tester'
    expect(newUser.isDirty).toBe(true)
    newUser.inspect()
  })
})
