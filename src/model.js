const modelProxy = function(object, missingMethod) {
  const proxyObject = new Proxy(object, {
    get(object, property) {
      if (Reflect.has(object, property)) {
        return Reflect.get(object, property)
      } else {
        return (...args) =>
          Reflect.apply(missingMethod, proxyObject, [property, ...args])
      }
    },
    set(object, property, value) {
      if (Reflect.has(object, property)) {
        // set isdirty
        Reflect.set(object, 'isDirty', true)
        return Reflect.set(object, property, value)
      }
    },
  })
  return proxyObject
}

const generateModel = ({ name, identifier, schema }) => {
  // return model
  const keys = Object.keys(schema)

  const objModel = {}
  const meta = { ...schema }
  keys.forEach(k => {
    objModel[k] = ''
  })
  return modelProxy(
    {
      ...objModel,
      __name: name,
      __meta: meta,
      isDirty: false,
      save: () => console.log('save'),
      inspect: function() {
        const objModel = {}
        const keys = Object.keys(schema)
        keys.forEach(k => {
          objModel[k] = this[k]
        })
        console.info(`The model ${name}`)
        console.table([objModel])
      },
    },
    (method, ...args) => console.info('The method missing', method, ...args)
  )
}
const generateModelFactory = config => {
  return {
    create: details => {
      const model = generateModel(config)
      const keys = Object.keys(details)
      keys.forEach(k => {
        model[k] = details[k]
      })
      model.isDirty = false
      return model
    },
  }
}
export default generateModelFactory
