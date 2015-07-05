import Collection from '../lib/collections';
import assert from 'assert';

describe('The Collection Object', function () {
	describe('the initial functional api', function () {
        it('should allow an item to be added to it', function (done) {
            let collection = new Collection();
            let first = collection.length;
            collection.add({name:'my item'});
            assert.ok(first < collection.length);
            done();
        });  
    });
});