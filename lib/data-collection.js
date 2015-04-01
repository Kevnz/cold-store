var DataCollection = (function () {
	var instance;
	 
	function createInstance(collection) {
		var object = {
			collectionName: collection,
			collection: []
		};
		return object;
	}
 
	return {
		getCollection: function (collecion) {
			if (!instance) {
				instance = createInstance(collecion);
			}
			return instance;
		}
	};
})();