// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//  
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

// Admin loggin///

Cypress.Commands.add('Admin_login', (username, password) => {
  //
  cy.viewport(2000, 1080); // Set viewport size

  cy.visit('https://settings-comics.akriviahcm.io/login', { failOnStatusCode: false }); // Visit the login page and ignore failures temporarily

  // Handle any unexpected errors or logs
  cy.on('uncaught:exception', (err, runnable) => {
    // Ignore known errors or handle them gracefully
    return false;
  });

  cy.wait(1000); // Wait for page to load (adjust as needed)

  cy.get('#username').type(username); // Enter username

  cy.wait(1000); // Wait for username input (adjust as needed)

  cy.get('#password').type(password); // Enter password

  cy.get('.ah-login-action-set > .ah-btn').click(); // Click login button

  // cy.wait(2000); // Wait for login to complete (adjust as needed)
})


// UI-3 specific module //
Cypress.Commands.add('selectmodule', (modulename) => {
  cy.wait(8000);
  cy.get('.ah-quick-active-card-text').contains(modulename).click()

});
//UI-4 specific module //
Cypress.Commands.add('adminmodule', (adminmodule) => {
  cy.wait(2000);
  cy.get('div > .ah-setting-card').contains(adminmodule).click()

})

//attendance sub screens
Cypress.Commands.add('attendance', (sub) => {

  cy.get('.common-nav a', { timeout: 10000 }).should('be.visible');
  cy.get('.common-nav a').each(($el, index, $list) => {
    const text = $el.text().trim().toLowerCase();
    if (text.includes(sub.toLowerCase())) {
      cy.wrap($el).click();
    }
  });
});

// date picker....................................................dateselection.......................

Cypress.Commands.add('checkAndNavigate', (trimpastdays, trimmonthday, date) => {

  if (trimpastdays.includes("yes")) {

    cy.log('enter into sdfsdf');

    function checkAndNavigate() {
      cy.xpath('//div[contains(@class,"datepicker-title")]/child::*')
        .then(($els) => {
          const elements = $els.toArray();
          return elements;
        })
        .then((elements) => {
          if (elements.length > 0) {
            const firstElement = elements[0];
            return cy.wrap(firstElement).invoke('text');
          }
        })
        .then((month) => {
          cy.log('Month:', month);

          const trimmonth = month.trim().toLowerCase();

          cy.log(trimmonth, 'pppppppppppppppp');
          cy.log(trimmonthday, 'ddddddddddddddddddddd');

          if (trimmonth.includes(trimmonthday)) {
            cy.xpath('//div[contains(@class, "ui-datepicker-calendar")]//table//tr//td//a[not(contains(@class, "ui-state-disabled"))] | //div[contains(@class, "p-datepicker-calendar")]//table//tr//td/*[not(contains(@class, "p-disabled")) and not(self::a)]')
              .each(($element) => {
                cy.wrap($element).invoke('text').then((text) => {
                  cy.log('Element text:', text);
                  if (text.includes(date)) {
                    cy.wrap($element).click();
                  }
                });
              });
          }

          else {
            // cy.wait(1000);
            cy.xpath('//span[contains(@class, "p-datepicker-prev-icon")] | //span[contains(@class, "ui-datepicker-prev-icon")]').click();
            // cy.wait(500);
            checkAndNavigate();
          }
        });
    }

    // Call the recursive function
    checkAndNavigate();
  } else {
    cy.log('enter into else');
    function checkAndNavigate() {

      cy.xpath('//div[contains(@class,"datepicker-title")]/child::*')
        .then(($els) => {
          const elements = $els.toArray();
          return elements;
        })
        .then((elements) => {
          if (elements.length > 0) {
            const firstElement = elements[0];
            return cy.wrap(firstElement).invoke('text');
          }
        })
        .then((month) => {
          cy.log('Month:', month);

          const trimmonth = month.trim().toLowerCase();

          cy.log(trimmonth, 'pppppppppppppppp');

          if (trimmonth.includes(trimmonthday)) {
            cy.xpath('//div[contains(@class, "ui-datepicker-calendar")]//table//tr//td//a[not(contains(@class, "ui-state-disabled"))] | //div[contains(@class, "p-datepicker-calendar")]//table//tr//td/*[not(contains(@class, "p-disabled")) and not(self::a)]')
              .each(($element) => {
                cy.wrap($element).invoke('text').then((text) => {
                  cy.log('Element text:', text);
                  if (text.includes(date)) {
                    cy.wrap($element).click();
                  }
                });
              });
          }

          else {
            // cy.wait(1000);
            cy.xpath('//span[contains(@class, "p-datepicker-next-icon")] | //span[contains(@class, "ui-datepicker-next-icon")]').click();
            // cy.wait(500);
            checkAndNavigate();
          }
        });
    }

    // Call the recursive function
    checkAndNavigate();
  }
});
/////////Attendance settings sub screens///////

Cypress.Commands.add('Attendance_Sub', (Sub_Name) => {
  cy.get('.ah-badge-set > button').each(($element) => {
    cy.wrap($element).invoke('text').then((text) => {
      cy.log('Element text:', text);
      if (text.includes(Sub_Name)) {
        cy.wrap($element).click();
      }
    })

  })
})

////////Drop down///////////////

Cypress.Commands.add('Dropdown', (fieldName, selectname) => {

  cy.wait(1000)
  cy.contains('label em', fieldName)
    .parent().parent() // Assuming you need to move up two levels from <em> to the parent of <label>
    .find('.dropdown')
    .should('be.visible')
    .click();
  cy.get('label em').contains(fieldName).parent().parent().find('.dropdown.show li').each(($element) => {
    cy.wrap($element).invoke('text').then((text) => {
      const data = text.trim();
      cy.log('ggggggggg', text);
      cy.log('space neglect', data);
      if (data === selectname)
        cy.wrap($element).click();
      return false;

    });
  });
});

//////////////date picker/////////////////

// const selectedMonth = 5;
// const selectedYear = 2027;
// const desiredDate = 30;

// Click until the desired month and year are visible

Cypress.Commands.add('DesiredMonth', (selectedMonth, selectedYear,desiredDate) => {

clickUntilVisible(selectedMonth, selectedYear, desiredDate);

function clickUntilVisible(selectedMonth, selectedYear, desiredDate) {

  cy.get('.p-datepicker-title, .ui-datepicker-title').should('be.visible').then(($els) => {
    const monthText = $els.find(':nth-child(1)').text().trim();
    const yearText = $els.find(':nth-child(2)').text().trim();

    // Validate month and year texts
    if (!monthText || !yearText) {
      cy.log('Error: Could not extract month and year from date picker title.');
      return; // Exit function early or handle gracefully
    }

    const matchMonth = monthText.match(/[A-Za-z]+/);
    const matchYear = yearText.match(/\d{4}/);

    if (!matchMonth || !matchYear) {
      cy.log('Error: Could not extract valid month and year from date picker title.');
      return; // Exit function early or handle gracefully
    }

    const currentMonth = matchMonth[0];
    const currentYear = parseInt(matchYear[0]);

    // Compare current month and year with selected month and year
    if (currentYear > selectedYear || (currentYear === selectedYear && getMonthNumberFromName(currentMonth) > selectedMonth)) {
      cy.get('.p-datepicker-prev-icon, .ui-datepicker-prev-icon').click();
      clickUntilVisible(selectedMonth, selectedYear, desiredDate);
    } else if (currentYear < selectedYear || (currentYear === selectedYear && getMonthNumberFromName(currentMonth) < selectedMonth)) {
      cy.get('.p-datepicker-next-icon, .ui-datepicker-next-icon').click();
      clickUntilVisible(selectedMonth, selectedYear, desiredDate);
    } else {
      // Once desired month and year are visible, select the desired date
      selectDesiredDate(desiredDate);
    }

  });

}


function selectDesiredDate(desiredDate) {

  cy.get('table.ui-datepicker-calendar, table.p-datepicker-calendar').should('be.visible');

  cy.get('table.ui-datepicker-calendar tbody tr td, table.p-datepicker-calendar tbody tr td').each(($td) => {
    cy.wrap($td).then(($td) => {

      if ($td.find('.ui-state-disabled').length > 0 || $td.find('.p-disabled').length > 0) {

        // Handle disabled dates if needed

        cy.log("Disabled dates found:", $td.text());

      } else {

        const dateText = $td.text().trim();

        if (dateText === desiredDate.toString()) {

          cy.wrap($td).click();

          cy.log("Clicked on the desired date:", desiredDate);

        }

      }

    });

  });

}


function getMonthNumberFromName(monthName) {

  return new Date(`${monthName} 1, 2024`).getMonth() + 1; // getMonth() returns zero-indexed month number

}

})

// import * as XLSX from 'xlsx';

// Cypress.Commands.add("parseXlsx", (inputFile) => {
//  const workbook = XLSX.readFile(inputFile)
//  return workbook;
// });
Cypress.Commands.add('DropdownReport', (fieldName, selectname) => {

  cy.wait(1000)
  cy.contains('form-label ah-sm', fieldName)
    .parent().parent() // Assuming you need to move up two levels from <em> to the parent of <label>
    .find('.dropdown')
    .should('be.visible')
    .click();
  cy.get('form-label ah-sm').contains(fieldName).parent().parent().find('.dropdown.show li').each(($element) => {
    cy.wrap($element).invoke('text').then((text) => {
      const data = text.trim();
      cy.log('ggggggggg', text);
      cy.log('space neglect', data);
      if (data === selectname)
        cy.wrap($element).click();
      return false;

    });
  });
});





// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })