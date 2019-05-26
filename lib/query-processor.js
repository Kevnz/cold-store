const { buildSchema, parse } = require('graphql')

const processor = query => {
  console.log('buildSchema', buildSchema)
  return parse(query)
}

export default processor
