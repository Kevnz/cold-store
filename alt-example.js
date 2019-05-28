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
}) // save to local

newUser.lastName = 'Last'
// newUser.isDirty === true
User.store(newUser) // puts updated user into local store
console.log('The new user', newUser)
