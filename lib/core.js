// In the following line, you should include the prefixes of implementations you want to test.
window.indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB
// DON'T use "var indexedDB = ..." if you're not in a function.
// Moreover, you may need references to some window.IDB* objects:
window.IDBTransaction = window.IDBTransaction ||
  window.webkitIDBTransaction ||
  window.msIDBTransaction || { READ_WRITE: 'readwrite' } // This line should only be needed if it is needed to support the object's constants for older browsers
window.IDBKeyRange =
  window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

let datastore
export const open = function(dbName, version = 1) {
  return new Promise((resolve, reject) => {
    // Open a connection to the datastore.
    const request = indexedDB.open(dbName, version)

    // Handle datastore upgrades.
    request.onupgradeneeded = function(e) {
      const db = e.target.result

      // ?? e.target.transaction.onerror = tDB.onerror

      // Delete the old datastore.
      if (db.objectStoreNames.contains(dbName)) {
        db.deleteObjectStore(dbName)
      }

      // Create a new datastore.
      const store = db.createObjectStore(dbName, {
        keyPath: 'timestamp',
      })
    }

    // Handle successful datastore access.
    request.onsuccess = function(e) {
      // Get a reference to the DB.
      datastore = e.target.result
      const db = request.db
      const tx = db.transaction(dbName, 'readwrite')
      const index = db.index('')
      return resolve({
        db,
        tx,
        index,
      })
    }

    request.onerror = error => reject(error)
  })
}
