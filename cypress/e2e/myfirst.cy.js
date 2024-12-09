//import commands from '../../support/commands';

describe('My First Test', function() {
  // import : cypress\support\commands.js

  // import import './commands';
    it('Logs in, navigates to Attendance Management, and clicks Apply Leave', function() {
      cy.viewport(2000, 1080); // Set viewport size
 
      cy.visit('https://uat.akriviahcm.in'); // Visit the login page
 
      cy.wait(6000); // Wait for page to load (adjust as needed)
 
      cy.xpath('//input[@id="emp_id"]').type("ptr002"); // Enter username
 
      cy.wait(6000); // Wait for username input (adjust as needed)
 
      cy.xpath('(//input[@id="password"])[1]').type("Master@1234"); // Enter password
 
      cy.get('.ah-login-action-set > .ah-btn').click(); // Click login button
 
      cy.wait(8000); // Wait for login to complete (adjust as needed)
 
      cy.selectmodule("Attendance Management")

      cy.attendance("Apply");

      cy.get('#shift-apply').click({ force: true });

      cy.get(':nth-child(1) > .ah-list-title').click()

      cy.get('#basic').click()

        const pastdays = "yes"
        const monthday = "may"
        const date = "29"
        // const trimpastdays = pastdays.trim().toLowerCase();
        const trimmonthday = monthday.trim().toLowerCase();


      
    
      cy.checkAndNavigate(pastdays,trimmonthday,date);

      const fieldName = 'Shift'
      const selectname = " SOS "

      // cy.dropdown(fieldName)
      cy.contains('label em', fieldName)
      .parent().parent()  // Assuming you need to move up two levels from <em> to the parent of <label>
      .find('.dropdown')
      .should('be.visible')
      .click();
    
      cy.xpath("//label/em[contains(text(),'"+fieldName+"')]/../..//*[@class='dropdown show']//li").each(($element) => {
      cy.wrap($element).invoke('text').then((text) => {
              cy.log('Element text:', text);
              if(text === selectname)
              cy.wrap($element).click();
              return false;

       }); 
      });
  });
});
  