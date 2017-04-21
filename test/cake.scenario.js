require('chai').should();

Feature('Some feature', () => {

  Scenario('Some Scenario', () => {

    let number = 2;

    Given('a number', () => {
      number.should.exist;
    });
    And('that number is 2', () => {
      number.should.equal(2);
    });

    When('adding 40', () => {
      number += 40;
    });

    Then('the number should be 42', () => {
      number.should.equal(42);
    });
  });
});