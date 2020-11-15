import moment from 'moment'
import BaseRoute from '$/modules/core/base/route'

export default class TransactionRoute extends BaseRoute {
  init() {
    // call super.init() only when you need default routes
    super.init()
    this.findByCurrency()
    this.findByDateRange()
    this.findByStatus()
  }

  findByCurrency() {
    this.router.get(`${this.route}/currency/:code`, async ctx => {
      const { code } = ctx.params
      const records = await this.controller.find(null, null, null, {
        currencyCode: { eq: code },
        isActive: { eq: true }
      })
      ctx.ok(records)
    })
  }

  findByDateRange() {
    this.router.get(`${this.route}/transaction-date/:start/:end`, async ctx => {
      const { start, end } = ctx.params
      const DATE_FORMAT = 'DD-MM-YYYY'
      const startDate = moment(start, DATE_FORMAT).toDate()
      const endDate = moment(end, DATE_FORMAT).toDate()
      const records = await this.controller.find(null, null, null, {
        andArray: [
          { transactionDate: { gte: startDate } },
          { transactionDate: { lte: endDate } }
        ],
        isActive: { eq: true }
      })
      ctx.ok(records)
    })
  }

  findByStatus() {
    this.router.get(`${this.route}/status/:status`, async ctx => {
      const { status } = ctx.params
      console.log('status: ', status)
      const records = await this.controller.find(null, null, null, {
        status: { eq: status },
        isActive: { eq: true }
      })
      ctx.ok(records)
    })
  }
}
