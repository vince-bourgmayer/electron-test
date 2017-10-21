const assert = require('assert')
const expect = require('expect.js')


class EasyCarousel {
	constructor(){
		this._data = []
		this._currentIndex = -1
		this._size = 0
	}
	//add one to currentIndex or first if we are at the end of data
	next(){
		if(this._size > 0){
			if(this._currentIndex < this._size-1)
				this._currentIndex+=1
			else
				this._currentIndex = 0
		}else
			this._currentIndex = -1
		return this;
	}
	//drop one to currentIndex previous element or last if we are at start
	prev(){
		if(this._size > 0){
			if(this._currentIndex > 0)
				this._currentIndex -= 1
			else
				this._currentIndex = this._size-1
		}else
			this._currentIndex = -1
		return this;
	}
	//Reset object to initial data
	reset(){
		this._data = []
		this._size = 0
		this._currentIndex = -1
	}

	//Add an element to data
	add(element){
		this._data.push(element)
		this._size += 1
		return this
	}
	//Add an element to specified position
	addAt(element, position){
		this._data.splice(position, 1, element)
		return this
	}
	//Supprime the element at the specified position
	removeAt(position){
		this._data.splice(position, 1)
		this._size -= 1
		return this
	}

	get currentIndex(){
		return this._currentIndex;
	}
	set currentIndex(val){
		//I got error in this function because at the beginin properties had the same name as getter
		this._currentIndex = val
		return this
	}
	get size(){
		return this._size
	}
}

describe('test easyCarousel class', ()=>{
	let t
	it('expect to fail', ()=>{
		expect().fail("Failed as expected")
	})
	describe('currentIndex()', ()=>{
		before(()=>{
			t = new EasyCarousel()
		})
		it('should initialize with currentIndex -1', ()=>{
			expect(t.currentIndex).to.eql('-1')
		})
		it("should return a number", ()=>{
			expect(t.currentIndex).to.be.a('number')
		})
	})
	describe('size()', ()=>{
		before(()=>{
			t = new EasyCarousel()
		})
		it("should return a number", ()=>{
			expect(t.currentIndex).to.be.a('number')
		})
		it('expect to get size of 0', ()=>{
			expect(t.size).to.eql('0')
		})
		it('expect to get a size of 1 after one add', ()=>{
			t.add({toto:'toto'})
			expect(t.size).to.eql('1')
		})
		afterEach(()=>{
			t.reset()
		})
	})
	describe('reset()', ()=>{
			before(()=>{
				t = new EasyCarousel()
			})
			it("expect to be at initial state", ()=>{
				expect(t).to.be.eql({_data:[], _currentIndex: -1, _size: 0})
			})
			it("expect to be at initial state after add then reset", ()=>{
				t.add({toto:"toto"})
				t.reset()
				expect(t).to.be.eql({_data:[], _currentIndex: -1, _size: 0})
			})
	})
	describe('next()', () =>{
		describe('With empty data', ()=>{
			before(()=>{
				t = new EasyCarousel()
			})
			it("expect to have current index equal to -1 with no next's call", ()=>{
				expect(t.currentIndex).to.eql('-1')
			})
			it("expect to have current index equal to -1 after one next's call", ()=>{
				t.next()
				expect(t.currentIndex).to.eql('-1')
			})
			it("expect to have current index equal to -1 after two next's call", ()=>{
				t.next().next()
				expect(t.currentIndex).to.eql('-1')
			})
			afterEach(function() {
				t.reset()
			});		
		})
		describe('With one data', ()=>{
			before(()=>{
				t = new EasyCarousel()
			})
			beforeEach(()=>{
				t.add({toto:'toto'})	
			})
			it("expect to have current index equal to -1 with no next's call", ()=>{
				expect(t.currentIndex).to.eql('-1')
			})
			it("expect to have current index equal to 0 after one next's call", ()=>{
				t.next()
				expect(t.currentIndex).to.eql('0')
			})
			it("expect to have current index equal to -1 after two next's call", ()=>{
				t.next().next()
				expect(t.currentIndex).to.eql('0')
			})
			afterEach(function() {
				t.reset()
			});
		})
		describe("with many data", ()=>{
			before(()=>{
				t = new EasyCarousel()
			})
			beforeEach(()=>{
				t.add({toto:'toto'})	
				t.add({tutu:'tutu'})	
				t.add({titi:'titi'})	
			})
			it("expect to have current index equal to -1 with no next's call", ()=>{
				expect(t.currentIndex).to.eql('-1')
			})
			it("expect to have current index equal to 1 after two next's call",()=> {

				t.next().next()//Index = 1
				expect(t.currentIndex).to.eql('1')
			})
			it("expect to have current index equal to 0 after four next's call",()=> {
				t.next().next().next().next()
				expect(t.currentIndex).to.eql('0')
			})
			afterEach(function() {
				t.reset()
			});
		})
	})

	describe('prev()', () =>{
		describe('With empty data', ()=>{
			before(()=>{
				t = new EasyCarousel()
			})
			it("expect to have current index equal to -1 with no prev's call", ()=>{
				expect(t.currentIndex).to.eql('-1')
			})
			it("expect to have current index equal to -1 after one prev's call", ()=>{
				t.prev()
				expect(t.currentIndex).to.eql('-1')
			})
			it("expect to have current index equal to -1 after two prev's call", ()=>{
				t.prev().prev()
				expect(t.currentIndex).to.eql('-1')
			})
			afterEach(function() {
				t.reset()
			});		
		})
		describe('With one data', ()=>{
			before(()=>{
				t = new EasyCarousel()
			})
			beforeEach(()=>{
				t.add({toto:'toto'})	
			})
			it("expect to have current index equal to -1 with no prev's call", ()=>{
				expect(t.currentIndex).to.eql('-1')
			})
			it("expect to have current index equal to 0 after one prev's call", ()=>{
				t.prev()
				expect(t.currentIndex).to.eql('0')
			})
			it("expect to have current index equal to -1 after two prev's call", ()=>{
				t.prev().prev()
				expect(t.currentIndex).to.eql('0')
			})
			afterEach(function() {
				t.reset()
			});
		})
		describe("with many data", ()=>{
			before(()=>{
				t = new EasyCarousel()
			})
			beforeEach(()=>{
				t.add({toto:'toto'})	
				t.add({tutu:'tutu'})	
				t.add({titi:'titi'})	
			})
			it("expect to have current index equal to -1 with no prev's call", ()=>{
				expect(t.currentIndex).to.eql('-1')
			})
			it("expect to have current index equal to 1 after two prev's call",()=> {

				t.prev().prev()
				expect(t.currentIndex).to.eql('1')
			})
			it("expect to have current index equal to 2 after four prev's call",()=> {
				t.prev().prev().prev().prev()
				expect(t.currentIndex).to.eql('2')
			})
			afterEach(function() {
				t.reset()
			});
		})
	})





})