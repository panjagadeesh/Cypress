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
   
        cy.wait(2000); // Wait for login to complete (adjust as needed)
   
        cy.adminmodule("Attendance Settings")
        
        cy.get(':nth-child(2) > .ah-badge-link-card-body > .ah-badge-set > :nth-child(5)').click()

        // cy.get('.ah-btn-set > .ah-btn').click()
        cy.wait(3000)

        cy.get('.ah-btn-set > .ah-btn').click()

        
      // const fieldName = "Attendance Policy"
      // const selectname = 


      cy.Dropdown("Attendance Policy","sentry");
      cy.Dropdown("Attendance Regularization Policy","Payroll optemize");
      cy.Dropdown("On Duty Policy","RM ON DUTY");
      cy.Dropdown("Shift Change Policy","shift swap rm");
      

    })
})