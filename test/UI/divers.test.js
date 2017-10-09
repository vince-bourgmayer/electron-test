const assert = require('assert')
const Datastore = require('nedb')
const expect = require('expect.js')


function makeSinglePropertyObject(objet={}, attr, val){
	// return {attr: value} => Doesn't work
	return Object.defineProperty(objet, attr, {value: val, enumerable:true})
}

describe('makeSinglePropertyObject', ()=>{
	let array
	before(function(){
		array = ['toto', 'titi', 'tutu']
	})
	it('should have property toto', ()=>{
		let objet = makeSinglePropertyObject('toto','toto')
		expect(objet).to.have.property('toto')
	})
	it('should be equal to {toto:toto}',()=>{
		let objet = makeSinglePropertyObject('toto','toto')
		expect(objet).to.eql({toto:'toto'})
	})
	it('should return three single property object', () => {
		let objectArray = array.map((x)=>{ return makeSinglePropertyObject(x, x) })
		expect(objectArray).to.have.length(3)
	})
})
