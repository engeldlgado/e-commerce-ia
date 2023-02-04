import { gql } from '@apollo/client'

export const SEARCH_PRODUCTS = gql`
  query SearchProducts($filter: TableStringFilterInput, $limit: Int, $offset: Int) {
    searchProducts(filter: $filter, limit: $limit, offset: $offset) {
      items {
        id
        name
        description
        price
        contact
        gallery
        user {
          id
          username
        }
      }
      count
    }
  }
`

export const GET_PRODUCT = gql`
  query Product($productId: ID!) {
    product(id: $productId) {
      id
      name
      price
      description
      contact
      gallery
      user {
        id
        username
      }
    }
  }
`
