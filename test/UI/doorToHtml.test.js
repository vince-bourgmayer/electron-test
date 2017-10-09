const assert = require('assert')
const Datastore = require('nedb')
const expect = require('expect.js')

let db = new Datastore({filename: 'db/keychain-test.db', autoload: true});


function doorToHtml(door){
	const removeButtonHtml="<div class='btn-in-carousel'><button class='btn-remove-btn' id='"+door.name+"'>delete</button></div>"
	return "<div class='door'><div><h3>"+door.name+"</h3></div>"+removeButtonHtml+"</div>"
}

let result


//This is tests about database
describe('doorToHtml', function(){
	before(function(){
		result = doorToHtml({foo:'bar'})
	})
	it('should return a string', function(){
		expect(result).to.be.a('string')
	})
	it('shouldn\'t be empty string', function(){
		expect(result).to.not.have.length(0)
	})
	after(function(){
		console.log(result)
	})
		// it('should be an array', function(){
		// 	db.find({}, function(err,docs){
		// 		expect(docs).to.be.an('array')
		// 	})
		// })
		// it('should be empty', function(){
		// 	db.find({}, function(err,docs){
		// 		expect(docs).to.be.empty()
		// 	})
		// })
		// before(function(){
		// 	db.insert({name:'door A', login:'toto', password:'titi'})
		// })
		// it('should contains one', function(){
		// 	db.find({}, function(err, docs){
		// 		expect(docs).to.contain(1)
		// 	})
		// })
		// after(function(){
		// 	db.remove({}, {multi: true})
		// })
})