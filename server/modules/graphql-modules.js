import { UserModel, UserController } from '$/modules/user'

export default config => [
  new UserController(UserModel, config)
]
