const assert = require("assert");
const { Given, When, Then } = require("@cucumber/cucumber");
const sum = require("@/composables/sum");

let number1;
let number2;
let answer;

Given("två tal", function () {
  number1 = 1;
  number2 = 2;
});

When("summerar dem", function () {
  answer = sum(number1, number2);
});

Then("blir svaret summan", function () {
  assert.equal(answer, 3);
});
