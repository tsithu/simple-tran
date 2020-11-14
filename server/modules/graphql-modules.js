import { UserModel, UserController } from '$/modules/user'
import { TransactionModel, TransactionController } from '$/modules/transaction'

export default config => [
  new UserController(UserModel, config),
  new TransactionController(TransactionModel, config)
]
