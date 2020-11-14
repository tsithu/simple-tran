import { Builder, Nuxt } from 'nuxt'
import nuxtConfig from ':/nuxt.config'

export default ({ app, config }) => {
  const { isDevelopment: dev } = config
  const nuxt = new Nuxt({ dev, ...nuxtConfig })

  app.ready = false

  nuxt.ready().then(() => {
    if (dev) {
      const builder = new Builder(nuxt)
      builder.build().then(() => app.start())
    }

    app.use(ctx => {
      ctx.status = 200
      ctx.respond = false
      ctx.req.ctx = ctx
      // ctx.res.csrf = ctx.csrf
      return nuxt.render(ctx.req, ctx.res)
    })
  })
}
