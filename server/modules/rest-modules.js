import { UserRoute, UserModel, UserController } from '$/modules/user'

export default (config, router) => ([
  new UserRoute(new UserController(UserModel, config), router)
])
