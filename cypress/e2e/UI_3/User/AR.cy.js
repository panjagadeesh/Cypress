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
     
    const desiredDate = 20; // The desiredDate variable is set to 20, meaning the script will look for and click on the 20th day of the selected month.
    clickuntilvisible(desiredDate);
    });
    });
     
    function clickuntilvisible(desiredDate) {
    cy.get('.p-datepicker-title *:nth-child(1), .ui-datepicker-title *:nth-child(1)').then(($el) => {
    const month = $el.text();
    cy.log(month);
    const selectedMonth = 5; // May
    if (getMonthNumberFromName(month) > selectedMonth) {
    cy.get('.p-datepicker-prev-icon, .ui-datepicker-prev-icon').click();
    clickuntilvisible(desiredDate);
    } else if (getMonthNumberFromName(month) < selectedMonth) {
    cy.get('.p-datepicker-next-icon, .ui-datepicker-next-icon').click();
    clickuntilvisible(desiredDate);
    } else {
    checkDayStatus(desiredDate);
    }
    });
    }
     
    function checkDayStatus(desiredDate) {
    cy.get('table.ui-datepicker-calendar, table.p-datepicker-calendar').should('be.visible');
    cy.get('table.ui-datepicker-calendar tbody tr td, table.p-datepicker-calendar tbody tr td').each(($td) => {
    cy.wrap($td).then(($td) => {
    if ($td.find('.ui-state-disabled').length > 0 || $td.find('.p-disabled').length > 0) {
    cy.log("***********************Disabled dates", $td.text());
    if ($td.find('.ui-state-disabled').length > 0) {
    expect($td.find('.ui-state-disabled')).to.have.class('ui-state-disabled');
    cy.log("Disabled date with ui-state-disabled class", $td.text());
    }
    if ($td.find('.p-disabled').length > 0) {
    expect($td.find('.p-disabled')).to.have.class('p-disabled');
    cy.log("Disabled date with p-disabled class", $td.text());
    }
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
    return new Date(`${monthName} 1, 2024`).getMonth() + 1;
    }