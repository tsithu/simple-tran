import cluster from 'cluster'
import { cpus } from 'os'
import $logger from ':/shared'

export default startApp => {
  const cpuCount = cpus().length

  if (cluster.isMaster) {
    for (let i = 0; i < cpuCount; i++) {
      cluster.fork()
    }
    cluster.on('exit', worker => {
      $logger.info('Cluster %d is dead', worker.process.pid)
      // Ensuring a new cluster will start if an old one dies
      cluster.fork()
    })
  } else {
    startApp()
  }
}
