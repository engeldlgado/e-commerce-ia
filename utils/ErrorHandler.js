// Create a Error Handler Factory to handle errors

const createErrorHandler = (name) =>
  class CustomError extends Error {
    constructor (message) {
      super(message)
      this.name = name
    }
  }

export const ConnectionError = createErrorHandler('ConnectionError')
export const AuthenticationError = createErrorHandler('AuthenticationError')
export const AuthorizationError = createErrorHandler('AuthorizationError')
export const ValidationError = createErrorHandler('ValidationError')
export const NotFoundError = createErrorHandler('NotFoundError')
export const ConflictError = createErrorHandler('ConflictError')
export const InternalError = createErrorHandler('InternalError')
