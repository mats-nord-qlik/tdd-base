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

describe("functional mind", function() {
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
