module.exports = {
  apps: [{
    name: 'SimpleTran',
    script: './build/main.js',
    watch: false,
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production'
    },
    env_test: {
      NODE_ENV: 'test'
    },
    env_staging: {
      NODE_ENV: 'staging'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
}
