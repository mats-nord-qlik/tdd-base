import {expect} from 'chai';

/**
 * This is the non-functional version of the master mind kata.
 * It looks ok and simple, but has some issues
 * 
 * getMatch is doing too much, matching exact, matching included, and formatting the result.
 * This master mind function has no resuable components/functions. 
 * If you want to build new logic on this functions, you will have to start over from the beginning.
 * 
 */
const EM = "X", IM = "O", NM = "";
const getGame = (game) =>  game;


const getMatch = (game, guess) => {
	let result = "";
	// Exact Matches
	guess.forEach(( item, i ) => {
			result += item === game[i] ? EM : NM;
	});
	// Guess is in the set
	guess.forEach(( item, i ) => {
			result += item === game[i] ? NM : game.includes( item ) ? IM : NM;
	});
	return result;
};


describe("Master mind game", function(){

	it("should be a game", function() {			
		const game = getGame([1,2,4,4]);
		expect(game).to.be.an('Array');
	});

	it("should be a set of four numbers", function() {
		const game = getGame([1,2,4,4]);
		expect(game.length).equal(4);
		game.forEach( item =>{ 
			 expect(item).to.be.a('Number')
			}
		);
	});

	it("should return empty string when no match", function() {
		// setup
		const game = getGame([1,2,4,4]);
		const guess = [3,3,3,3];
		//act
		const match = getMatch( game, guess );
		//assert
		expect(match).equal("");
	});

	it("should return X when there is an exact match", function() {
		// setup
		const game = getGame([1,2,4,4]);
		const guess = [5,5,5,4];
		//act
		const match = getMatch( game, guess );
		//assert
		expect(match).equal("X");
	});

	it( "should return O when there is an number match", function ()	{
		// setup
		const game = getGame( [ 1,2,4,4 ] );
		const guess = [4,5,5,5];
		//act
		const match = getMatch( game, guess );
		//assert
		expect( match ).equal( "O" );
	});

	it( "Exact match overrides in set-match", function ()	{
		// setup
		const game = getGame( [1, 2, 4, 4 ] );
		const guess = [3,2,3,3];
		//act
		const match = getMatch( game, guess );
		//assert
		expect( match ).equal( "X" );
	});

	it( "should not reveal position", function ()	{
		// setup
		const game = getGame( [ 1,2,3,4 ] );
		const guess = [2,3,1,4];
		//act
		const match = getMatch( game, guess );
		//assert
		expect( match ).equal( "XOOO" );
	});

	it( "should show perfect game", function ()	{
		// setup
		const game = getGame( [ 1,2,3,4 ] );
		const guess = [1,2,3,4];
		//act
		const match = getMatch( game, guess );
		//assert
		expect( match ).equal( "XXXX" );
	});
});
