import DataCollection from '../lib/data-collection';
import assert from 'assert';
const FIRST_COLLECTION = 'first';
const SECOND_COLLECTION = 'second';

describe('The DataCollection Singleton', () => {
	it('should return an array for the collection', function (done) {

		let collection = DataCollection.getCollection(FIRST_COLLECTION);
		assert.ok(collection.length === 0, 'should be an empty array');
		collection.push({test:true});
		assert.ok(DataCollection.getCollection(FIRST_COLLECTION).length === 1);
		done();
	});

	it('should return different arrays for different collections', function (done) {
		let collection = DataCollection.getCollection(FIRST_COLLECTION);	
		let otherCollection = DataCollection.getCollection(SECOND_COLLECTION);
		assert.ok(otherCollection.length === 0);
		assert.ok(collection !== otherCollection);
		done();
	});
});