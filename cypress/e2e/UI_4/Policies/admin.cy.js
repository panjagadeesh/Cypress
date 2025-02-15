//import commands from '../../support/commands';

describe('My First Test', function() {
    // import : cypress\support\commands.js
  
    // import import './commands';
      it('Logs in, navigates to Attendance Management, and clicks Apply Leave', function() {
        cy.viewport(2000, 1080); // Set viewport size
   
        cy.visit('https://uat.settings.akriviahcm.in', { failOnStatusCode: false }); // Visit the login page and ignore failures temporarily

        // Handle any unexpected errors or logs
        cy.on('uncaught:exception', (err, runnable) => {
          // Ignore known errors or handle them gracefully
          return false;
        });
        
        cy.wait(2000); // Wait for page to load (adjust as needed)
   
        cy.get('#username').type("Rsmaster"); // Enter username
   
        cy.wait(2000); // Wait for username input (adjust as needed)
   
        cy.get('#password').type("Rsmaster@123456"); // Enter password
   
        cy.get('.ah-login-action-set > .ah-btn').click(); // Click login button
   
        cy.wait(8000); // Wait for login to complete (adjust as needed)
   
        cy.adminmodule("Attendance Settings")

        cy.get('.row > div:nth-of-type(1) > div:nth-of-type(1) button:nth-of-type(1)').click()
        
        cy.get('.ah-btn-set > .ah-btn').click()
  
        // cy.attendance("Apply");
  
        // cy.get('#shift-apply').click({ force: true });
  
        // cy.get('#basic').click()
  
        cy.get('#basic').click()
        
        const pastdays = "yes"
        const monthday = "may"
        const date = "29"
        const trimpastdays = pastdays.trim().toLowerCase();
        const trimmonthday = monthday.trim().toLowerCase();


      
    
      cy.checkAndNavigate(trimpastdays,trimmonthday,date);

  
         });
    });
    