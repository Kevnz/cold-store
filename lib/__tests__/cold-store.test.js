import ColdStore from '../index'

describe('The API', () => {
  describe('the initialization of the module', () => {
    it('should throw if no collection is given', () => {
      expect(() => {
        new ColdStore()
      }).toThrow()
    })
    it('should take a db name in the ctor', () => {
      var store = new ColdStore('items')
      expect(store).not.toBeNull()
    })
    it('should have a function called find on returned object', done => {
      var store = new ColdStore('items')
      expect(typeof store.find).toBe('function')
    })
    it('should return an array when find is called', done => {
      var store = new ColdStore('items')
      expect(typeof store.find).toBe('function')
      store.find(function(err, items) {
        expect(err).toBeNull()
        expect(typeof items.length).toBe('number')
        done()
      })
    })
    it('should have a function called save on returned object', _ => {
      var store = new ColdStore('items')
      expect(typeof store.save === 'function').toBe(true)
    })
    it('should execute callback on save', done => {
      var store = new ColdStore('items')
      store.save({}, (err, item) => {
        expect(err).toBeNull()
        expect(true).toBe(true)
        done()
      })
    })
    it('should have a function called delete on returned object', _ => {
      var store = new ColdStore('items')
      expect(typeof store.delete === 'function').toBe(true)
    })

    it('should take a config object in the constructor', _ => {
      let store = new ColdStore({
        collection: 'items',
        url: 'http://api.example.com',
      })
      expect(store !== null).toBe(true)
    })
  })
  describe('how items are saved, retrieved and removed ', () => {
    let db = new ColdStore('items')

    it('should save an item', done => {
      db.save({ name: 'test' }, (err, item) => {
        expect(err).toBeNull()
        expect(item.name).toBe('test')
        done()
      })
    })
    it('should get the the item when find is called with query', done => {
      db.save({ name: 'dummy test' }, (err, item) => {
        expect(err).toBeNull()
        db.find({ name: 'test' }, (err, items) => {
          expect(err).toBeNull()
          expect(items.length).toBe(1)
          expect(items[0].name === 'test').toBe(true)
          done()
        })
      })
    })
    it('should remove an item when delete is called', done => {
      db.delete({ name: 'dummy test' }, err => {
        expect(err).toBeNull()
        db.find((err, items) => {
          expect(err).toBeNull()
          expect(items.length).toBe(1)
          done()
        })
      })
    })
  })
})
