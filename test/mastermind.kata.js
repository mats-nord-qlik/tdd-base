import {expect} from 'chai';

/**
 * I will put my game in the same file as the test
 */
const EM = "X", IM = "O";
const getGame = (game) =>  game;
const getMatch = (game, guess) => {
	let result = "";
	// Exact Matches
	guess.forEach(( item, i ) => {
			result += item === game[i] ? EM : "";
	});
	// Guess is in the set
	guess.forEach(( item, i ) => {
			result += item === game[i] ? "" : game.includes( item ) ? IM : ""
	});
	return result;
};


describe("Master mind game", function(){

	it("should be a game", function() {			
		const game = getGame([1,2,3,4]);
		expect(game).to.be.an('Array');
	});

	it("should be a set of four numbers", function() {
		const game = getGame([1,2,3,4]);
		expect(game.length).equal(4);
		game.forEach( item =>{ 
			 expect(item).to.be.a('Number')
			}
		);
	});

	it("should return empty string when no match", function() {
		// setup
		const game = getGame([1,1,1,1]);
		const guess = [4,4,4,4];
		//act
		const match = getMatch( game, guess );
		//assert
		expect(match).equal("");
	});

	it("should return + when there is an exact match", function() {
		// setup
		const game = getGame([1,1,1,1]);
		const guess = [1,2,3,4];
		//act
		const match = getMatch( game, guess );
		//assert
		expect(match).equal("X");
	});

	it( "should return - when there is an number match", function ()	{
		// setup
		const game = getGame( [ 1,2,2,2 ] );
		const guess = [2,3,3,3];
		//act
		const match = getMatch( game, guess );
		//assert
		expect( match ).equal( "O" );
	});

	it( "should not reveal position", function ()	{
		// setup
		const game = getGame( [ 1,2,3,4 ] );
		const guess = [4,4,4,4];
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
