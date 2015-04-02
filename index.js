import sift from 'sift';
import DataCollection from './lib/data-collection';

export default class ColdStore {
    constructor(props) {
    	if (typeof props === 'string') {
    		this.setDB = props;
			this.collection = DataCollection.getCollection(props);
    	} 
    	console.log(props);
    	if(props === undefined) {
    		throw new Error('ColdStore requires a collection item')
    	}
        super(props);
    }
    find(query, callback) {
    	let q;
    	if (typeof query === 'object' && typeof callback === 'function') {
    		let result = sift(query, this.collection);
    		callback(null, result);
    		return;
    	}
    	if (typeof query === 'function') {
    		callback = query;
    		callback(null, this.collection);
    	} else {
    		callback(true, null);
    	}
    	

    }
    save(item, callback) {
    	this.collection.push(item);
    	callback(null, item);
    }
    delete(query, callback) {
    	this.collection = sift(query,this.collection);
    	callback(null, null);
    }
}