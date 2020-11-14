import { kako } from 'kakojs'
import _ from 'lodash'
import config from ':/config'
import knexConfig from ':/knexfile'
import getMiddlewares from '$/middlewares'
import modLoader from '$/modules'

const app = kako({
  config,
  knexConfig,
  middlewares: ({ middlewares: buildInMiddlewares }) => {
    const middlewares = getMiddlewares(config)
    buildInMiddlewares.forEach(item => {
      const { options, disable } = _.find(middlewares, { name: item.name }) || {}
      if (options) {
        item.options = options
      }
      if (disable != null) {
        item.disable = disable
      }
    })
    return [...buildInMiddlewares, ...middlewares.filter(({ middleware: mw }) => mw != null)]
  },
  modules: ({ router }) => (router ? modLoader.rest(config, router) : modLoader.graphql(config))
})

export default app
