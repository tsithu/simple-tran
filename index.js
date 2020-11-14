import dotenv from 'dotenv'

dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

import('./server').catch(err => {
  console.log(err)
  process.exit(-1)
})
