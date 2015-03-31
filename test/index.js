var ColdStore = require('../index');
var assert = require('assert');
describe('The API', function () {
	describe('the initialization of the module', function () {
		it('should take a db name in the ctor', function (done) {
			var store = new ColdStore('items');
			assert.ok(store !== null);
		});
		it('should have a function called find on returned object', function (done) {
			var store = new ColdStore('items');
			assert.ok(typeof store.find === 'function');
			done();
		});
		it('should return an array of objects when find is called', function (done) {
			var store = new ColdStore('items');
			assert.ok(typeof store.find === 'function');
			store.find(function(err, items) {
				
			})
		});
		it('should have a function called save on returned object', function (done) {
			var store = new ColdStore('items');
			assert.ok(typeof store.save === 'function');
		});
		it('should have a function called delete on returned object', function (done) {
			var store = new ColdStore('items');
			assert.ok(typeof store.delete === 'function');
		});
	});
});