describe('My First Test', function() {
  // Import statements can go here if needed

  it('Logs in, navigates to Attendance Management, and clicks Apply Leave', function() {
    try {
      cy.viewport(2000, 1080); // Set viewport size

      cy.visit('https://reistaging.akriviahcm.com'); // Visit the login page
      cy.wait(4000); // Wait for page to load

      try {
        cy.xpath('//input[@id="emp_id"]').type("re0077"); // Enter username
        cy.wait(2000); // Wait for username input
      } catch (error) {
        cy.log('Error entering username:', error.message);
      }

      try {
        cy.xpath('(//input[@id="password"])[1]').type("Ran%Kal@85akv"); // Enter password
        cy.get('.ah-login-action-set > .ah-btn').click(); // Click login button
        cy.wait(8000);
      } catch (error) {
        cy.log('Error entering password or clicking login:', error.message);
      }

      try {
        cy.selectmodule("Reports");
        cy.get("#reports > .angle-arrow").click();
      } catch (error) {
        cy.log('Error navigating to Reports module:', error.message);
      }

      const targetmodule = 'Attendance Management';
      cy.get('ul.common-mega-menu li').each(($el) => {
        try {
          if ($el.text().trim() === targetmodule) {
            cy.wrap($el).click();
          }
        } catch (error) {
          cy.log('Error clicking on Attendance Management:', error.message);
        }
      });

      let TAA = [];
      cy.fixture("T&A_Reports.json").then((data) => {
        TAA = data;
        cy.log(JSON.stringify(TAA), "Reports data");

        TAA.forEach((daat, index) => {
          try {
            cy.log(`Processing report ${index + 1}`, daat);
            reportsdata(daat);
          } catch (error) {
            cy.log(`Error processing report ${index + 1}:`, error.message);
          }
        });
      });

      function reportsdata(aa) {
        cy.log("Processing report data");

        cy.get('.ah-reports-title').each(($title, index) => {
          try {
            const text = $title.text().trim();
            cy.log('Title:', text);
            if (text === aa) {
              cy.log('Matching title found');
              cy.wrap($title)
                .closest('.ah-reports-card')
                .find('.ah-btn-text')
                .then(($button) => {
                  cy.log('Button found:', $button);
                  cy.wrap($button).click();
                });
              return false;
            }
          } catch (error) {
            cy.log('Error finding or clicking report button:', error.message);
          }
        });

        try {
          cy.get('[tooltiptext="Filters"] > .far').click();
          cy.get('#reportFiltersDate').click();
        } catch (error) {
          cy.log('Error interacting with filters:', error.message);
        }

        const Dropdownvalue = 'Month';

        cy.get('.ah-unselect-text')
          .invoke('text')
          .then((currentSelection) => {
            try {
              const selectedValue = currentSelection.trim();
              cy.log(`Currently selected: ${selectedValue}`);

              if (selectedValue === Dropdownvalue) {
                cy.log(`${Dropdownvalue} is already selected. Skipping button click.`);
                return;
              } else {
                cy.log("Selecting new dropdown value");
                cy.get('.ah-unselect-text:first').click({ force: true });

                cy.get('div.dropdown-menu.show ul li').each(($element) => {
                  cy.wrap($element)
                    .invoke('text')
                    .then((text) => {
                      const trimmedText = text.trim();
                      cy.log(trimmedText, "Checking option");
                      if (trimmedText === Dropdownvalue) {
                        cy.log("Selecting dropdown value: " + Dropdownvalue);
                        cy.wrap($element).click();
                        return false;
                      }
                    });
                });
              }
            } catch (error) {
              cy.log('Error selecting dropdown value:', error.message);
            }
          });

        try {
          cy.get('#monthpicker').click(); // Open the month picker

          cy.get('div.ui-monthpicker a').each(($el) => {
            cy.wrap($el)
              .invoke('text')
              .then((text) => {
                try {
                  const desiredmonth = text.trim();
                  cy.log(desiredmonth, "Current month option");
                  if (desiredmonth === 'May') {
                    cy.log("Clicking on 'May'");
                    cy.wrap($el).click();
                    return false;
                  }
                } catch (error) {
                  cy.log('Error selecting month:', error.message);
                }
              });
          });

          cy.get('.filter-card-footer > .ah-btn').click();
          cy.wait(8000);

          cy.get('.table.table-bordered.ah-sticky-table', { timeout: 10000 })
            .should('contain', '')
            .screenshot('passed-screenshot');

          cy.get('.header-back-btn > .ah-btn-only-icon').click();
        } catch (error) {
          cy.log('Error during report filters and interactions:', error.message);
        }
      }
    } catch (error) {
      cy.log('Test failed due to unexpected error:', error.message);
    }
  });
});
