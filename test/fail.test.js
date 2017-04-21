import {expect} from 'chai';

describe("Fail", function() {

	it("should fail", function() {
		expect(1, "It is expected to fail!").equal(-1);
	});
});