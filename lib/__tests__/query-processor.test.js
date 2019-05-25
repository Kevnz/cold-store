const processor = require('../query-processor').default

describe('The Query Processor', () => {
  it('should give me an object', () => {
    console.log('p', processor)
    const q = `
    query posts($id: String) {
      posts(id: $id) {
        id
        title
        content
      }
    }`
    const sdl = `
    query posts($id: String) {
      posts(id: $id) {
        id
        title
        content
      }
    }
    mutation CreatePost($title: String!, $content: String!) {
      createPost(title: $title, content: $content) {
        id
      }
    }
  `
    const out = processor(sdl)
    console.log('out', out)
  })
})
