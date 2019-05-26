'use strict'
const collection = Symbol()

export default class Collection {
  constructor(props) {
    if (typeof props === 'string') {
      this.name = props
    } else if (typeof props === 'object') {
      this.name = props.collection
      this.url = props.url
    }
    this[collection] = []
  }
  get data() {
    return this[collection]
  }
  set data(value) {
    delete this[collection]
    this[collection] = value
  }
  get length() {
    return this[collection].length
  }
  push(item) {
    this[collection].push(item)
  }
  add(item) {
    this[collection].push(item)
  }
  load() {}
}
