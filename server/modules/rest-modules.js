import { UserRoute, UserModel, UserController } from '$/modules/user'
import {
  TransactionRoute,
  TransactionModel,
  TransactionController
} from '$/modules/transaction'

export default (config, router) => ([
  new UserRoute(new UserController(UserModel, config), router),
  new TransactionRoute(new TransactionController(TransactionModel, config), router)
])
