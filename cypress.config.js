const { defineConfig } = require("cypress");

module.exports = defineConfig

({
  defaultCommandTimeout: 60000,
  e2e: {
    e2e: {
      baseUrl: "https://settings-comics.akriviahcm.io", // Default URL
      env: {
        settings: "https://settings-comics.akriviahcm.io",
        comics: "https://comics.akriviahcm.io",
        starwars : "https://starwars.akriviahcm.io/",
      },
    },
    // Enable screenshots on failure
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
