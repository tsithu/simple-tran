import nuxt from './nuxt'
import upload from './upload'
export default config => [
  {
    name: 'koa-body',
    options: {
      multipart: true,
      uploadDir: config.uploadDir
    }
  },
  {
    name: 'koa-ratelimit',
    disable: true,
    options: Redis => ({
      db: new Redis(),
      duration: 30000,
      errorMessage:
        'Rate limit exceeded. You seem to be doing that a bit too much.',
      id: ctx => ctx.ip,
      headers: {
        remaining: 'Rate-Limit-Remaining',
        reset: 'Rate-Limit-Reset',
        total: 'Rate-Limit-Total'
      },
      max: 200,
      disableHeader: false
    })
  },
  {
    name: 'nuxt',
    disable: config.isApiOnly,
    middleware: nuxt
  },
  {
    name: 'upload',
    middleware: upload,
    options: {
      uploadDir: config.uploadDir
    }
  }
]
