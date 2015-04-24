'use strict';
import Collection from '../lib/collections';
import assert from 'assert';

describe('The Collection Object', function () {
	describe('the initial functional api', function () {
        it('should allow an item to be added to it', function (done) {
            let collection = new Collection();
            collection.add({name:'my item'});
            assert.ok(false);
            done();
        });  
    });
});