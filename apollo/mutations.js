import { gql } from '@apollo/client'

export const LOGIN_SIGNUP = gql`
  mutation CreateOrLoginUser($input: UserLogin!) {
  createOrLoginUser(input: $input) {
    value
  }
}
`

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: ProductInput!) {
  createProduct(input: $input) {
    name
    description
    price
    contact
  }
}
`

export const GET_USER = gql`
  query {
    me {
      id
      username
      products {
        id
        name
        description
        price
      }
    }
  }
`
