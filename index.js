import sift from 'sift'
import DataCollection from './lib/data-collection'

export default class ColdStore {
  constructor(props) {
    if (props === undefined) {
      throw new Error('ColdStore requires at least a collection item')
    }
    if (typeof props === 'string') {
      this.setDB = props
      this.collection = DataCollection.getCollection(props)
    } else {
      this.setDB = props.collection
      this.collection = DataCollection.getCollection(props)
    }
  }
  find(query, callback) {
    let q
    if (typeof query === 'object' && typeof callback === 'function') {
      let result = sift(query, this.collection.data)
      callback(null, result)
      return
    }
    if (typeof query === 'function') {
      callback = query
      callback(null, this.collection)
    } else {
      callback(true, null)
    }
  }
  save(item, callback) {
    this.collection.push(item)
    callback(null, item)
  }
  delete(query, callback) {
    let data = sift(query, this.collection.data)
    this.collection.data = data
    callback(null, null)
  }
}
