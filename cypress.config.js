const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // Enable screenshots on failure
    screenshotOnRunFailure: true,

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});