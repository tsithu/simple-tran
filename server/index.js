import app from './app'
import $logger from ':/shared'

const { EXEC_MODE, NODE_ENV } = process.env

if (NODE_ENV === 'production') {
  if (EXEC_MODE === 'cluster') {
    import('./cluster')
      .then(cluster => {
        cluster.default(app.start)
      })
      .catch(err => {
        $logger.error(err)
        process.exit(-1)
      })
  } else {
    app.start()
  }
} else {
  app.start(app.ready)
}
