import ColdStore from 'cold-store'

const example = async () => {
  const storage = new ColdStore('MYAPP')
  const posts = storage.collection('posts') // may be async

  const allPosts = await posts.findAll() // all posts from local/http
  const singlePost = await posts.findOne({
    id: 1,
  })
  singlePost.set('title', 'My Blog Post')
  const resultOfSave = await singlePost.save() // saves to local
  console.info('result of calling save', resultOfSave)
  // sync to api
  const syncResult = await posts.sync()
  console.info('sync result', syncResult)
}

const graphQLExample = async () => {
  const storage = new ColdStore('https://myurl/graphql')
  const select = `
  query posts($id: ID) {
    posts(id: $topicId) {
      id
      title
      content
    }
  }`

  const mutie = `
  mutation CreatePost($title: String!, $content: String!) {
    createPost(title: $title, content: $content) {
      id
    }
  }
  `
  const mutieUpdated = `
  mutation UpdatePost($id: ID!, $title: String!, $content: String!) {
    updatePost(id: $id, title: $title, content: $content) {
      id
    }
  }
  `

  const posts = storage.graphql('posts', {
    select,
    create: mutie,
    update: mutieUpdated,
  }) // may be async

  const allPosts = await posts.findAll() // all posts from local/http
  // calls select with no params checks local storage as well as url

  console.info('all the posts', allPosts)

  const singlePost = await posts.findOne({
    id: 1,
  })
  singlePost.set('title', 'My Blog Post')
  const resultOfSave = await singlePost.save() // saves to local only
  console.info('result of calling save', resultOfSave)
  // sync to api
  const syncResult = await posts.sync()
  console.info('sync result', syncResult)
}
