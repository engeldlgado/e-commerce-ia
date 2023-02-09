
import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'utils/models/Schema.graphql',
  generates: {
    'types/gql.ts': {
      plugins: ['typescript', 'typescript-resolvers']
    }
  }
}

export default config
