import User from './models/User.js'
import Product from './models/Product.js'
import {
  AuthenticationError,
  AuthorizationError
} from './ErrorHandler'

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

export const convertStringToRegexp = (text) => {
  let regexp = ''
  const textNormalized = text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove all accents
    .replace(/[|\\{}()[\]^$+*?.]/g, '\\$&') // remove all regexp reserved char
    .toLowerCase()

  regexp = textNormalized
    .replace(/a/g, '[a,á,à,ä,â,ã]')
    .replace(/e/g, '[e,é,ë,è,ê]')
    .replace(/i/g, '[i,í,ï,ì,î]')
    .replace(/o/g, '[o,ó,ö,ò,õ,ô]')
    .replace(/u/g, '[u,ü,ú,ù,û]')
    .replace(/c/g, '[c,ç]')
    .replace(/n/g, '[n,ñ]')
    .replace(/[ªº°]/g, '[ªº°]')
  return new RegExp(regexp, 'i') // "i" -> ignore case
}

const resolvers = {
  Query: {
    products: async (root, args) => {
      const products = await Product.find({})
        .sort({ createdAt: -1 })
        .limit(args.limit)
        .skip(args.offset)
      return products.populate('user')
    },
    product: async (root, args) => {
      const product = await Product.findById(args.id)
      return product.populate('user')
    },
    searchProducts: async (root, args) => {
      const products = await Product.find({
        $or: [
          { name: convertStringToRegexp(args.text) },
          { description: convertStringToRegexp(args.text) }
        ]
      })
      return products
    },
    me: async (root, args, context) => {
      return context.userLogged?.populate('products')
    }
  },
  Mutation: {
    createOrLoginUser: async (root, args) => {
      const username = await User.findOne({ username: args.input.username })
      if (username) {
        // if username already exists in the database make a login
        const passwordCorrect = await bcrypt.compare(
          args.input.password,
          username.passwordHash
        )
        if (!passwordCorrect) {
          throw new AuthenticationError('Invalid password')
        }
        const userForToken = {
          username: username.username,
          id: username.id
        }
        return { value: jwt.sign(userForToken, JWT_SECRET, { expiresIn: '7d' }), user: username }
      }

      const user = new User({
        username: args.input.username,
        passwordHash: await bcrypt.hash(args.input.password, 10)
      })
      const signUser = await user.save()
      const userForToken = {
        username: signUser.username,
        id: signUser.id
      }
      return { value: jwt.sign(userForToken, JWT_SECRET, { expiresIn: '7d' }), user: signUser }
    },
    createProduct: async (root, args, context) => {
      const loggedUser = context.userLogged
      const input = args.input
      if (!loggedUser) {
        throw new AuthenticationError('Not authenticated')
      }
      const product = new Product({
        name: input.name,
        description: input.description,
        price: input.price,
        gallery: input.gallery,
        contact: input.contact,
        user: loggedUser.id
      })
      const savedProduct = await product.save()
      loggedUser.products = loggedUser.products.concat(savedProduct._id)
      await loggedUser.save()
      return savedProduct.populate('user')
    },
    updateProduct: async (root, args, context) => {
      const product = await Product.findById(args.id)
      if (product.user.toString() !== context.userLogged.id) {
        throw new AuthorizationError('Not authorized')
      }
      const input = args.input
      const updatedProduct = { ...product, ...input }
      await updatedProduct.save()
      return updatedProduct.populate('user')
    },
    deleteProduct: async (root, args, context) => {
      const product = await Product.findById(args.id)
      if (product.user.toString() !== context.userLogged.id) {
        throw new AuthorizationError('Not authorized')
      }
      await product.delete()
      return product.populate('user')
    }
  }
}

export default resolvers
