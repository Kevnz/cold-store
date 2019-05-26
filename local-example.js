const ColdStore = () => {}

const storage = ColdStore('app:name')

const collection = storage('posts')

const posts = collection.getAll()

const topPosts = collection.find({
  views: {
    '>': 100,
  },
})
