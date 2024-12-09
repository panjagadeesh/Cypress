describe('login', () => {
    beforeEach('Go to login', () => {
        cy.visit('https://uat.akriviahcm.in');
        cy.wait(4500);
        cy.get("#emp_id").type("PTR002");
        cy.get("#password").click().type("Master@1234");
        cy.get('.ah-login-btn').click();
        cy.wait(8000);
    });

    it('Go to attendance', () => {
        cy.get('.ah-quick-active-card-text').each(($el) => {
            if ($el.text().includes('Attendance Management')) {
                cy.wrap($el).click();
            }
        });
        cy.wait(8000);
        cy.get("#attendance_details").click();
        cy.wait(2000);
        cy.get("#shift-apply").click();
        cy.wait(2000);
        cy.get("#basic").click();

        const date = 6;
        const month = 9
        cy.Desired_month(date,month)

     
        // clickuntilvisible(desiredDate)

     
    });
});

