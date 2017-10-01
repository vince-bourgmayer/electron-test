const assert = require('assert')

let db = new Datastore({filename: 'db/keychain-test.db', autoload: true});

//This is tests about database
describe('Database', function(){
	//This is tests about getting data from DB
	describe('get', function(){
		it('should return all data in Datastore', function(){
			console.log('all data have been returned')
		})
	})
	//This is tests about saving data in DB
	// describe('save', function(){

	// })
})