const assert = require('assert')
const Datastore = require('nedb')
const expect = require('expect.js')


function makeSinglePropertyObject(objet, attr, val){
	// return {attr: value} => Doesn't work
	return Object.defineProperty(objet, attr, {value: val, enumerable:true})
}

describe('makeSinglePropertyObject', ()=>{
	let array
	before(function(){
		array = ['toto', 'titi', 'tutu']
	})
	it('should have property toto', ()=>{
		let objet = makeSinglePropertyObject({}, 'toto','toto')
		expect(objet).to.have.property('toto')
	})
	it('should be equal to {toto:toto}',()=>{
		let objet = makeSinglePropertyObject({}, 'toto','toto')
		expect(objet).to.eql({toto:'toto'})
	})
	it('should return three single property object', () => {
		let objectArray = array.map((x)=>{ return makeSinglePropertyObject({}, x, x) })
		expect(objectArray).to.have.length(3)
	})
})

function applyFuncOnArray(array, func, args){
    for(elt of array){
        func.apply(this, [elt, args])
    }
}

function resetValue(object){
    object.value = ''
    return objet
}
//Attach a property to an object
function setProperty(source, object){
    // return {attr: value} => Doesn't work
    return Object.defineProperty(object, source.name, {value: source.value, enumerable:true})
}

describe('applyFuncOnArray',()=>{
	let array
	let object
	before(()=>{
		array= [{name:'toto', value:'titi'},
		{name:'tete', value:'tata'},
		{name:'tutu', value:'tyty'}]
		object = {}
	})
	it('should make an object with tutu field', ()=>{
		applyFuncOnArray(array, setProperty, object)
		expect(object).to.have.property('tutu')
	})

	it('should check another way', ()=>{
		array.map((x)=>{
			setProperty.apply(this, [x, object])
		})
		expect(object).to.have.property('tutu')
	})
})