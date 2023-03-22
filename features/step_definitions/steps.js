const assert = require("assert");
const { Given, When, Then } = require("@cucumber/cucumber");

class Recipe {
  constructor() {
    this.title = "";
  }
}
const recipe = new Recipe();

Given("det finns ett recept", function () {
  recipe.title = "Testrecept";
  console.log(recipe.title);
});

When("tittar på det", function () {
  // Write code here that turns the phrase above into concrete actions
});

Then("ser jag information om receptet", function () {
  // Write code here that turns the phrase above into concrete actions
});
