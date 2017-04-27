import {expect} from 'chai';
/**
 * Basic functions
 */

// Should have an identity implementation
const getGame = game =>  game;

/**
 * A few instructive words about the code
 * 
 * This is my functional version of master mind game
 * 
 * The pram starts in the function "check" (look further down)
 * check does it's work on three lines:
 * 
 * 1 gets the exact matches
 * 2 gets the included matches, with the exact matches filtered out (filet can be put on it's own line if you like)
 * 3 Formats the output for the player that is guessing - basically it censors the anwer like [1,2] would be replace with "XX"" for exact matcher, and [3] replaced with "O" for other matches 
 * 
 * Staring from the check function, it is easy to follow the path in the program
 * Every function/callback that is need is individually tested
 * The match function exposes the API for the match. It also takes a matcher that is either an exactMatcher or an includeMatcher
 * 
 * The program is not perfect, please send me a message wiht your findings. :-)
 *
 */
const exactMatcher = game => ( peg, i ) => peg === game[i];
const includeMatcher = game =>  peg  =>  game.includes( peg );
const match = ( matcher, game ) => guess => guess.map( matcher( game ));
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
