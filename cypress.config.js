const { defineConfig } = require("cypress");

module.exports = defineConfig

  ({
    defaultCommandTimeout: 60000,
    reporter: 'cypress-mochawesome-reporter',
    e2e: {

      baseUrl: "https://settings-comics.akriviahcm.io", // Default URL
      env: {
        settings: "https://settings-comics.akriviahcm.io",
        comics: "https://comics.akriviahcm.io",
        starwars: "https://starwars.akriviahcm.io/",
      },

      // Enable screenshots on failure
      screenshotOnRunFailure: true,
      video: true,
     
      setupNodeEvents(on, config) {
        require('cypress-mochawesome-reporter/plugin')(on); 
        
      },
    },

  });
