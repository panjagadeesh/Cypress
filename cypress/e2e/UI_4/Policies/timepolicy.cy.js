describe('My First Test', function() {
      it('Logs in, navigates to Attendance Management, and clicks Apply Leave', function() {
        cy.viewport(2000, 1080); 
        cy.visitGlobal();
        cy.loginDetails("admin", "cadmin", "Master@1234")
        cy.adminmodule("Attendance Settings");
        cy.get(':nth-child(2) > .ah-badge-link-card-body > .ah-badge-set > :nth-child(5)').click()
        cy.wait(3000)

        cy.get('.ah-btn-set > .ah-btn').click()

      cy.Dropdown("Attendance Policy","sentry");
      cy.Dropdown("Attendance Regularization Policy","Payroll optemize");
      cy.Dropdown("On Duty Policy","RM ON DUTY");
      cy.Dropdown("Shift Change Policy","shift swap rm");
      

    })
})