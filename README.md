# Testing Project: Simple Transaction

## Configure .env File
Rename .env.sample into .env.development
Create empty database in PostgreSQL
Change the following config values
``` bash
DB_HOSTNAME=[Database Hostname]
DB_NAME=[Database Names]
DB_USER=[Database User Name]
DB_PASSWORD=[Database Password]
```
## Build Setup

``` bash
# install dependencies
$ yarn install

# Create the empty database in postgresql and run
$ yarn db

# serve with hot reload at localhost:2020
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start
```

## Docker
Dockerfile and docker-compose.yaml are added. But it is just a sample config.
