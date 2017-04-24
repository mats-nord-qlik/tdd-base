import {expect} from 'chai';

/**
 * I will put my game in the same file as the test
 */
const getGame = (game) =>  game;
const exMatch = game => ( peg, i ) => peg === game[i];
const inMatch = game =>  peg  =>  game.includes( peg );
//Should probably be a filter
const reducer =  guess => ( result, match, i ) =>  match ? result.concat(guess[i]) : result;

const filtr = exclude => candidate => !exclude.includes(candidate);
const formatter = symbol => (acc, item) => acc + symbol;

function matchExact(game, guess){
	const exMatcher = exMatch(game);
	return guess.map(exMatcher)
}

function matchIncl(game, guess){
	const inMatcher = inMatch(game);
	return guess.map(inMatcher)	
}
	
function formatString(exactMatches, includeMatches){
	return exactMatches.reduce(formatter("X"), "" ) +
		 includeMatches.reduce(formatter("O"),"");
}

function check(game, guess){
	const exactMatches = matchExact(game, guess).reduce(reducer(guess), []);
	const includeMatches = matchIncl(game, guess).reduce(reducer(guess), []).filter(filtr(exactMatches));
	return formatString(exactMatches, includeMatches);
}

describe("Functions", function(){
	it("getGame()", function(){
		expect( getGame([1,2,3,4])).eql([1,2,3,4],"Game was not matched");
	});
	it("exMatch()", function(){
		expect(exMatch([1])).to.be.a('function', "exmatch() did not return a function");
		expect(exMatch([1])(1, 0)).true;
		expect(exMatch([1])(2, 0)).false;
	});
	it("inMatch()", function(){
		expect(inMatch([1])).to.be.a('function', "inMatch() did not return a function");
		expect(inMatch([0,0,1])(1, 0)).true;
		expect(inMatch([0,0,1])(2, 0)).false;
	});
	it("reducer()", function(){
		expect(reducer( [1,2] )).to.be.a('function', "reducer() did not return a function");
		expect(reducer( [3,4] )([], true, 1)).eql([4]);
		expect(reducer( [5,6] )([], false, 0)).eql([]);
	});
	it("filtr()", function(){
		expect(filtr( [1,2] )).to.be.a('function', "filtr() did not return a function");
		expect(filtr( [3,4] )( 5 ) ).true;
		expect(filtr( [5,6] )( 6 ) ).false;
	});
	it("formatter()", function(){
		expect(formatter( "X" )).to.be.a('function', "formatter() did not return a function");
		expect(formatter( "X" )("", 123 ) ).eql("X");
		expect(formatter( "Y" )([1,2,3], 123 ) ).eql("1,2,3Y");
	});

});

describe("Master mind", function() {
	const game = getGame([4,4,4,3]);

	it("should match exact", function (){
		const guess = [1,1,1,3];
		expect( check(game, guess)).eql("X");
	});
	it("should match included", function (){
		const guess = [3,1,1,1];
		expect( check(game, guess)).eql("O");
	});	
	it("should give exact match priority over included match", function (){
		const guess = [3,1,1,3];
		expect( check(game, guess)).eql("X");
	});	
	it("should match both", function (){
		const guess = [3,4,4,1];
		expect( check(game, guess)).eql("XXO");
	});	
	it("should match both", function (){
		const guess = [6,4,4,3];
		expect( check(game, guess)).eql("XXX");
	});	
	it("should match both", function (){
		const guess = [4,4,4,3];
		expect( check(game, guess)).eql("XXXX");
	});	
	it("should match both", function (){
		const game = getGame([1,2,3,4])
		const guess = [4,3,2,1];
		expect( check(game, guess)).eql("OOOO");
	});	
});
