var DataCollection = (()  => {
	var instances =[];
	 
	function createCollectionInstance() {
		return [];
	}
 
	return {
		getCollection: function (collection) {
			if (instances[collection] === undefined) {
				instances[collection] = createCollectionInstance();
			}
			return instances[collection];
		}
	};
})();

export default DataCollection;