import ShiftPage from "../../../support/PageObjects/UI_4/ShiftsPageObject/AddShiftPage";
// import './commands';

describe('Shift Management Test', function () {
  const shiftPage = new ShiftPage();
 

  it('Logs in, navigates to Attendance Management, and adds a shift', function () {
    Cypress.config('defaultCommandTimeout', 10000);
    cy.visitGlobal();
    
    cy.loginDetails("admin", "cadmin", "Master@1234")
    cy.adminmodule("Attendance Settings");
    cy.Attendance_Sub("Shifts");
    // Add Shift
    cy.fixture("AddShift.json").then((data) => {
    shiftPage.clickAddShift();
      if (data.length)
        shiftPage.fillShiftDetails(data[0]);
      const pastdays = "yes";
      const monthday = "jan";
      const date = "16";
      const trimpastdays = pastdays.trim().toLowerCase();
      const trimmonthday = monthday.trim().toLowerCase();

      try {
        cy.checkAndNavigate(trimpastdays, trimmonthday, date);
      } catch (error) {
        cy.log('Error in navigation function:', error.message);
      }
      // Handle Sessions
      shiftPage.addAndFillSessions(data);
      shiftPage.handleSingleShift(data);
    });
  });
});
