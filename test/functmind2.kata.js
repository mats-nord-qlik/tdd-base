import {expect} from 'chai';
import Set from '../src/mySet';
/**
 * Basic functions
 */

// Should have an identity implementation
const getGame = game =>  game;

// Matcher for ex and in match

const exactMatcher = game => ( peg, i ) => peg === game[i];

const includeMatcher = game =>  peg  =>  game.includes( peg );

const match = ( matcher, game ) => guess => guess.map( matcher( game ));

const match2 = (game, guess) =>{
	const gameSet = new Set(game);
	const guessSet = new Set(guess);
	console.log(gameSet.intersection(guessSet));
}

match2([1,2,3,3], [1,3,3,3]);

const reducer =  guess => ( result, match, i ) =>  match ? result.concat( guess[i]) : result;

const filtr = exclude => candidate => !exclude.includes(candidate);

const formatString = ( arr, chr ) => arr.join("").replace(/\d/g, chr );

describe("Functions", function(){
	it("getGame()", function(){
		expect( getGame([1,2,3,4])).eql(getGame([1,2,3,4]),"Game was not matched");
		expect( getGame([1,2,3,4])).eql([1,2,3,4],"Game was not matched");
	});
	it("exMatch()", function(){
		expect(exactMatcher([1])).to.be.a('function', "exactMatcher() did not return a function");
		expect(exactMatcher([1])(1, 0)).true;
		expect(exactMatcher([1])(2, 0)).false;
	});
	it("includeMatcher()", function(){
		expect(includeMatcher([1])).to.be.a('function', "includeMatcher() did not return a function");
		expect(includeMatcher([0,0,1])(1, 0)).true;
		expect(includeMatcher([0,0,1])(2, 0)).false;
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
	it("formatString()", function(){
		expect(formatString( [], "*" )).equal("", "formatString() failed on format empty array");
		expect(formatString( [1], "*" )).equal("*");
		expect(formatString( [1,0], "*" )).equal("**");
	});
});

/**
 * The master min in functional version
 */
const check = (game, guess) => {
	const exactMatches = match( exactMatcher, game )( guess ).reduce( reducer( guess ), []);
	const includeMatches = match( includeMatcher, game )( guess ).reduce( reducer( guess ), []).filter( filtr( exactMatches ));
	return formatString( exactMatches, "X") + formatString( includeMatches, "O");
}

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
	it("should match ", function (){
		const guess = [3,4,4,1];
		expect( check(game, guess)).eql("XXO");
	});	
	it("should match three out of four", function (){
		const guess = [6,4,4,3];
		expect( check(game, guess)).eql("XXX");
	});	
	it("should match exact match", function (){
		const guess = [4,4,4,3];
		expect( check(game, guess)).eql("XXXX");
	});	
	it("should match all in wrong place", function (){
		const game = getGame([1,2,3,4])
		const guess = [4,3,2,1];
		expect( check(game, guess)).eql("OOOO");
	});	
});
