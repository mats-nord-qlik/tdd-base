import {expect} from 'chai';
const logger = say => value => say("is: ", value ); 
const is = logger(console.log);
 
const length = ( [head,...tail] ) => 
	( head === undefined ) 
		? 0 
		: length( tail ) + 1;

is ( length(["Manage", "System", "Tribe"]) );
is ( 1 + length(["System", "Tribe"]) );
is ( 1 + 1 + length(["Tribe"]) );
is ( 1 + 1 + 1 + length([]) );
is ( 1 + 1 + 1 + 0 );
is ( 3 );

// unit tests follows :-)

describe.only("functional list", () =>{
	it("returns 0 for empty array", () =>{
		const list = [];
		expect(length(list)).eql(0);
	});
	it("returns length for the array", () =>{
		const list = [1];
		expect(length(list)).eql(1);
		const list2 = [0,1,2,3,4,5,6,7,8,9]; 
		expect(length(list2)).eql(10);
	});
	it("does not mutate", () =>{
		const list = [1];
		expect(length(list)).eql(length(list));
	});
})

const curry = ( f, arr = [] ) => (...args) => ( a => a.length === f.length ? f(...a) : curry(f, a) )([...arr, ...args]);

const add3 = curry((a, b, c) => a + b + c);
is( add3( 1, 2, 3 ) );
is( add3( 1, 2 )( 3 ) );
is( add3( 1 )( 2, 3 ) );
is( add3( 1 )( 2 )( 3 ) );

const a = add3(1);
const b = a(2)
const c = b(3);
is ( c );

const double = x => x * 2;
const doubleAdd = curry((double,d, e) => double(d) + double(e));
is( doubleAdd( double, 2, 3 ) );
is( doubleAdd( double, 2 )( 3 ) );
is( doubleAdd( double )( 2 )( 3 ) );




// describe.only("functional map", () =>{
// 	it("returns 0 for empty array", () =>{
// 		const list = [];
// 		expect(length(list)).eql(0);
// 	});
// 	it("returns length for the array", () =>{
// 		const list = [1];
// 		expect(length(list)).eql(1);
// 		const list2 = [0,1,2,3,4,5,6,7,8,9]; 
// 		expect(length(list2)).eql(10);
// 	});
// 	it("does not mutate", () =>{
// 		const list = [1];
// 		expect(length(list)).eql(length(list));
// 	});
// })