/* eslint-disable new-cap */
import koaRouter from 'koa-router'
import fs from 'fs'
import mime from 'mime-types'
import parseData from '$/lib/parser/parser-factory'
import validator from '$/lib/validator'
import { TransactionModel, TransactionController } from '$/modules/transaction'

export default ({ app, config }) => {
  const router = new koaRouter()
  const transactionCtrl = new TransactionController(TransactionModel, config)

  const saveData = async data => {
    const savedData = []
    const errors = []
    const currentUserId = 1 // never use hardcode value in actual project - will use current user

    if (data) {
      for (let i = 0; i < data.length; i++) {
        // eslint-disable-next-line security/detect-object-injection
        const record = data[i]
        // eslint-disable-next-line no-await-in-loop
        const savedRecord = await transactionCtrl.createNew({
          ...record,
          createdBy: currentUserId,
          updatedBy: currentUserId
        })
        savedData.push(savedRecord)
      }
    }
    return [savedData, errors.length > 0 ? errors : null]
  }
  router.post('/upload', async ctx => {
    const { request } = ctx
    const { uploadDir } = config
    const {
      path: src,
      name: fileName,
      type: fileType
    } = request.files.file
    const fileExtension = mime.extension(fileType)
    const validExt = ['csv', 'xml']

    if (validExt.indexOf(fileExtension) >= 0) {
      const dist = `${process.cwd()}/${uploadDir}/${fileName}`
      await fs.copyFile(src, dist, err => {
        if (err) {
          ctx.send(400, err)
        }
      })

      const [parsedData, errorsOnParse] = await parseData(dist, { validator })
      if (errorsOnParse) {
        ctx.send(400, errorsOnParse)
        return
      }

      const [savedData, errorsOnSave] = await saveData(parsedData)
      if (errorsOnSave) {
        ctx.send(400, errorsOnSave)
        return
      }

      ctx.ok(savedData)
    } else {
      ctx.send(400, 'Unknown format.')
    }
  })
  app.use(router.routes())
}
