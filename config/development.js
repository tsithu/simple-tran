const { env } = process
const accessTokenKey = 'access-token'
const restBase = '/api'
const graphqlBase = '/graphql'
const domain = `http://${env.HOST}:${env.PORT}`

module.exports = {
  sqlDebug: false,
  isDevelopment: true,
  isApiOnly: false,
  uploadDir: '/upload',
  api: {
    accessTokenKey,
    rest: { baseUrl: restBase },
    graphql: {
      baseUrl: graphqlBase,
      depthLimit: { maxDepth: 7, options: {} },
      queryComplexity: false, // { maximumComplexity: 5000, variables: {} },
      validationComplexity: { complexityLimit: 1500 }
    }
  },
  cors: {
    whitelist: [domain]
  },
  authentication: {
    userTable: 'users',
    strategies: ['local', 'jwt'],
    local: {
      usernameField: 'email',
      passwordField: 'password'
    },
    jwt: {
      entity: 'tokens',
      jsonWebTokenOptions: {
        audience: 'https://domain.com',
        issuer: 'domain.com',
        algorithm: 'HS256',
        expiresIn: { accessToken: '1h', refreshToken: '30d' }
      }
    },
    google: {
      clientID: 'your google client id',
      clientSecret: 'your google client secret',
      successRedirect: '/',
      scope: ['profile openid email']
    },
    facebook: {
      clientID: 'your facebook client id',
      clientSecret: 'your facebook client secret',
      successRedirect: '/',
      scope: ['public_profile', 'email'],
      profileFields: [
        'id',
        'displayName',
        'first_name',
        'last_name',
        'email',
        'gender',
        'profileUrl',
        'birthday',
        'picture',
        'permissions'
      ]
    },
    twitter: {},
    github: {
      clientID: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      callbackURL: `${domain}${restBase}/auth/login/github/callback`,
      scope: ['public_profile', 'email']
    }
  },
  paginate: {
    defaultPageSize: 100,
    maxPageSize: 500
  },
  clientConfigs: {
    accessTokenKey,
    restEndPoint: `${domain}${restBase}`,
    graphqlEndPoint: `${domain}${graphqlBase}`,
    subscriptionsEndPoint: `${domain}${graphqlBase}`.replace('http', 'ws')
  }
}
