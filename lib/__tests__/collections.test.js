import Collection from '../collections'

describe('The Collection Object', function() {
  describe('the initial functional api', function() {
    it('should allow an item to be added to it', function() {
      let collection = new Collection()
      let first = collection.length
      collection.add({ name: 'my item' })
      expect(first < collection.length).toBe(true)
    })
  })
})
