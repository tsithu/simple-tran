import supertest from 'supertest'
import startApp from '$/app'

describe('Core', () => {
  let server = startApp()
  let request

  beforeAll(async(/* done */) => {
    server = await server.listen()
    request = supertest(server)
  })

  afterAll(async(/* done */) => {
    await server.close()
  })

  describe('Rest API Root: GET=>/api/rest', () => {
    test('Should respond as expected.', async() => {
      const response = await request.get('/api')
      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
      expect(response.body.route).toEqual('root')
    })
  })

  describe('GraphQL API Root: GET=>/api/graphql', () => {
    test('Should respond as expected.', async() => {
      const response = await request.get('/api/graphql')
      expect(response.status).toEqual(400)
      expect(response.type).toEqual('text/plain')
    })
  })
})
