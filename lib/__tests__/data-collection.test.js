import DataCollection from '../data-collection'
const FIRST_COLLECTION = 'first'
const SECOND_COLLECTION = 'second'

describe('The DataCollection Singleton', () => {
  it('should return an array for the collection', function() {
    let collection = DataCollection.getCollection(FIRST_COLLECTION)
    expect(collection.length === 0).toBe(true)
    collection.push({ test: true })
    expect(DataCollection.getCollection(FIRST_COLLECTION).length === 1).toBe(
      true
    )
  })

  it('should return different arrays for different collections', function() {
    let collection = DataCollection.getCollection(FIRST_COLLECTION)
    let otherCollection = DataCollection.getCollection(SECOND_COLLECTION)
    expect(otherCollection.length === 0).toBe(true)
    expect(collection !== otherCollection).toBe(true)
  })
})
