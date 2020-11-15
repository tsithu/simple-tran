/* eslint-disable new-cap */
import koaRouter from 'koa-router'
import fs from 'fs'
import mime from 'mime-types'
import parseData from '$/lib/parser/parser-factory'
import validator from '$/lib/validator'
import { TransactionModel, TransactionController } from '$/modules/transaction'

export default ({ app, config }) => {
  const router = new koaRouter()
  const tranCtrl = new TransactionController(TransactionModel, config)

  const saveData = async data => {
    const savedData = []
    const errors = []

    if (data) {
      for (let i = 0; i < data.length; i++) {
        // eslint-disable-next-line security/detect-object-injection
        const record = data[i]
        // TODO: implement to save transaction data
        savedData.push(record)
        console.log(record)
        console.log(tranCtrl)
        // await tranCtrl.createNew(record)
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
    const allowedExt = ['csv', 'xml']

    if (allowedExt.indexOf(fileExtension) >= 0) {
      const dist = `${process.cwd()}/${uploadDir}/${fileName}`
      await fs.copyFile(src, dist, err => {
        if (err) {
          ctx.send(400, err)
        }
      })

      const [parsedData, errorsOnParse] = await parseData(dist, { validator })
      if (errorsOnParse) {
        ctx.send(400, errorsOnParse)
      }

      const [savedData, errorsOnSave] = await saveData(parsedData)
      if (errorsOnSave) {
        ctx.send(400, errorsOnSave)
      }

      ctx.ok(savedData)
    } else {
      ctx.send(400, 'Unknown format.')
    }
  })
  app.use(router.routes())
}
