import koaRouter from 'koa-router'
// import response from 'koa-respond'

export default ({ app, config }) => {
  // const { isDevelopment: dev } = config
  const router = new koaRouter()
  router.post("/upload", async ctx => {
    const { request } = ctx
    const { uploadDir } = config
    /*
    const file = (request.files || {}).file;
    const { key, url } = await uploadFile({
      fileName: file.name,
      filePath: file.path,
      fileType: file.type,
    });
    ctx.body = { key, url }
    */
    console.log('router', request)
    console.log('upload::config', uploadDir)
    ctx.ok({ id: 123, name: 'John Doe' });
  });
  app.use(router.routes())
}
