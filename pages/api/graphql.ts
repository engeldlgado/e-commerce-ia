import { InMemoryLRUCache } from '@apollo/utils.keyvaluecache'
import { ApolloServer } from 'apollo-server-micro'
import { readFileSync } from 'fs'
import jwt from 'jsonwebtoken'
import Cors from 'micro-cors'
import connectMongo from '../../utils/config/mongoConnection'
import User from '../../utils/models/User'
import resolvers from '../../utils/Resolvers'

const typeDefs = readFileSync('utils/models/Schema.graphql', { encoding: 'utf-8' })

connectMongo()

const cors = Cors({
  origin: 'https://studio.apollographql.com',
  allowCredentials: true,
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization']
})

export const config = {
  api: {
    bodyParser: false
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cache: new InMemoryLRUCache(),
  context: async ({ req }) => {
    const token = req ? req.headers.authorization : null
    const JWT_SECRET = process.env.JWT_SECRET
    if (token && token.startsWith('bearer ') && JWT_SECRET) {
      const decodedToken = jwt.verify(token.substring(7), JWT_SECRET, { algorithms: ['HS256'] }) as { id: string }
      const userLogged = await User.findById(decodedToken.id)
      return { userLogged }
    }
  }
})

const startServer = server.start()

console.log('GQL SERVER STARTED')

export default cors(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.end()
    return false
  }
  await startServer
  await server.createHandler({ path: '/api/graphql' })(req, res)
}
)
