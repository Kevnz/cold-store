import Collection from './collections';
var DataCollection = (()  => {
	var instances =[];
	 
	function createCollectionInstance(collection) {
		return new Collection(collection);
	}
 
	return {
		getCollection: function (collection) {
			if (typeof collection === 'string') {
				if (instances[collection] === undefined) {
					instances[collection] = createCollectionInstance(collection);
				}
				return instances[collection];
			}

		}
	};
})();

export default DataCollection;