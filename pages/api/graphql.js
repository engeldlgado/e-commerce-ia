import { ApolloServer } from 'apollo-server-micro'
import { InMemoryLRUCache } from '@apollo/utils.keyvaluecache'
import User from '../../utils/models/User'
import Cors from 'micro-cors'
import typeDefs from '../../utils/models/Schema'
import resolvers from '../../utils/Resolvers'
import connectMongo from '../../utils/config'

connectMongo()

const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET

const cors = Cors({
  origin: 'https://studio.apollographql.com',
  allowCredentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
  preflightContinue: false
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
    if (token && token.startsWith('bearer ')) {
      const decodedToken = jwt.verify(token.substring(7), JWT_SECRET)
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
