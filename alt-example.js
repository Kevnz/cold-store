import { Engine, Store } from 'cold-store'

const Storage = Store('TheApp')

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

const User = Engine(UserConfig, Storage)

const newUser = User.create({
  firstName: 'Test',
  lastName: 'Name',
  email: 'test@example.com',
})

console.log('The new user', newUser)
