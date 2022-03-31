import gql from 'graphql-tag'

// 1
export const ADD_RECIPE_MUTATION = gql`
  # 2
  mutation ($added_by: String!, $name: String!) {
    insert_recipe_one(object: { added_by: $added_by, name: $name }) {
      id
      name
    }
  }
`
