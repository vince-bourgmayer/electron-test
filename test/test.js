const assert = require('assert')
const Datastore = require('nedb')
const expect = require('expect.js')

let db = new Datastore({filename: 'db/keychain-test.db', autoload: true});

//This is tests about database
describe('Database', function(){
	//This is tests about getting data from DB
	describe('find all', function(){
		it('should be an array', function(){
			db.find({}, function(err,docs){
				expect(docs).to.be.an('array')
			})
		})
		it('should be empty', function(){
			db.find({}, function(err,docs){
				expect(docs).to.be.empty()
			})
		})
		before(function(){
			db.insert({name:'door A', login:'toto', password:'titi'})
		})
		it('should contains one', function(){
			db.find({}, function(err, docs){
				expect(docs).to.contain(1)
			})
		})
		after(function(){
			db.remove({}, {multi: true})
		})
	})

	describe('find some', function(){
		beforeEach(function(){
			db.insert([{name:'door A', login:'toto', password:'titi'}, {name:'window C', url:'www.monsite.com',login:'loginTest', password:'passwordTest'}])
		})
		it('should fail contain door B', function(){
			db.find({name:'door B'}, function(err, docs){
				expect().fail()
				// expect(docs).to.eql({name:'door B', url:'www.tonsite.com',login:'looginTest', password:'paasswordTest'})
			})
		})
		afterEach(function(){
			db.remove({}, {multi: true})
		})
	})
	//This is tests about saving data in DB
	// describe('save', function(){

	// })
})