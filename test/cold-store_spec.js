import ColdStore from '../index';
import assert from 'assert';

describe('The API', () => {
	describe('the initialization of the module', () => {
		it('should throw if no collection is given', function (done) {
			assert.throws(() => {
				new ColdStore();
			}, Error);
			done();
		});
		it('should take a db name in the ctor', (done) => {
			var store = new ColdStore('items');
			assert.ok(store !== null);
			done();
		});
		it('should have a function called find on returned object', (done) => {
			var store = new ColdStore('items');
			assert.ok(typeof store.find === 'function');
			done();
		});
		it('should return an array when find is called', (done) => {
			var store = new ColdStore('items');
			assert.ok(typeof store.find === 'function');
			store.find(function(err, items) {
				assert.ok(err === null);
				assert.ok(typeof items.length === 'number');
				done();
			})
		});
		it('should have a function called save on returned object', (done) => {
			var store = new ColdStore('items');
			assert.ok(typeof store.save === 'function');
			done();
		});
		it('should execute callback on save', (done) => {
			var store = new ColdStore('items');
			store.save({}, (err, item) => {
				assert.ok(true);
				done();
			})
			
		});
		it('should have a function called delete on returned object', (done) => {
			var store = new ColdStore('items');
			assert.ok(typeof store.delete === 'function');
			done();
		});
	});
	describe('how items are saved, retrieved and removed ', () => {
			let db = new ColdStore('items');

			it('should save an item', (done) => {
				db.save({name:'test'}, (err, item) => {
					assert.ok(item.name === 'test');
					done();
				});
			});
			it('should get the the item when find is called with query', (done) => {
				db.save({name:'dummy test'}, (err, item) => {
					db.find({name:  'test' }, (err, items) => {
						assert.ok(items.length === 1);
						assert.ok(items[0].name === 'test');
						done();
					})
				});

			});
			it('should remove an item when delete is called', (done) => {
				db.delete({name:'dummy test'}, (err) => {
					db.find((err, items) => {
						assert.ok(items.length === 1);
						done();
					});
				});
			});
	});
});
