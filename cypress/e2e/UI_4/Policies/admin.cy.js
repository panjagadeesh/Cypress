//import commands from '../../support/commands';

describe('My First Test', function() {
    // import : cypress\support\commands.js
  
    // import import './commands';
      it('Logs in, navigates to Attendance Management, and clicks Apply Leave', function() {
        cy.viewport(2000, 1080); // Set viewport size
        cy.visitGlobal();
    
        cy.loginDetails("admin", "cadmin", "Master@1234")
        cy.adminmodule("Attendance Settings");

        cy.get('.row > div:nth-of-type(1) > div:nth-of-type(1) button:nth-of-type(1)').click()
        
        cy.get('.ah-btn-set > .ah-btn').click()
  
        cy.get('#basic').click()
        
        const pastdays = "yes"
        const monthday = "may"
        const date = "29"
        const trimpastdays = pastdays.trim().toLowerCase();
        const trimmonthday = monthday.trim().toLowerCase();


      
    
      cy.checkAndNavigate(trimpastdays,trimmonthday,date);

  
         });
    });
    