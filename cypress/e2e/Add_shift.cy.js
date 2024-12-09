describe('My First Test', function() {
  it('Logs in, navigates to Attendance Management, and clicks Apply Leave', function() {
    try {
      cy.Admin_login("rsmaster", "Rsmaster@123456");
      cy.adminmodule("Attendance Settings");
      cy.Attendance_Sub(" Shifts ");

      try {
        cy.get('.ah-btn-set > .ah-btn').click();
        cy.get('.form-group-lg > #name').type('Addshiftdata');
        cy.get('#code').type('addShift1');
        cy.get('[formcontrolname="fullDay_hrs"]').type("07");
        cy.get('[formcontrolname="fullDay_min"]').type("18");
        cy.get('[formcontrolname="halfDay_hrs"]').type("04");
        cy.get('[formcontrolname="halfDay_min"]').type("30");

        cy.get('#basic').click();
      } catch (error) {
        cy.log('Error interacting with shift details form:', error.message);
      }

      const pastdays = "yes";
      const monthday = "july";
      const date = "16";
      const trimpastdays = pastdays.trim().toLowerCase();
      const trimmonthday = monthday.trim().toLowerCase();

      try {
        cy.checkAndNavigate(trimpastdays, trimmonthday, date);
      } catch (error) {
        cy.log('Error in navigation function:', error.message);
      }

      const filePath = 'cypress/fixtures/sessiondata.xlsx';
      let items = [];

      cy.fixture("AddShift.json").then((data) => {
        items = data;

        function fillSessionRow($row, index) {
          try {
            cy.get('[placeholder="Enter Session Name"]', { withinSubject: $row })
              .should('be.visible')
              .type(items[index].sessionName);
            cy.get('[formcontrolname="startTime"] [placeholder="HH"]', { withinSubject: $row }).type(items[index].StartTimeHH);
            cy.get('[formcontrolname="startTime"] [placeholder="MM"]', { withinSubject: $row }).type(items[index].StartTimeMM);
            cy.get('[formcontrolname="startTime"] .period-control__button').eq(index).click();
            
            cy.get('.period-selector >li> .period-selector__button', { withinSubject: $row }).each($button => {
              const buttonText = $button.text().trim();
              if (buttonText === items[index].Start_Period_Selector) {
                cy.wrap($button).click();
              }
            });

            cy.get('[formcontrolname="endTime"] [placeholder="HH"]', { withinSubject: $row }).type(items[index].EndTimeHH);
            cy.get('[formcontrolname="endTime"] [placeholder="MM"]', { withinSubject: $row }).type(items[index].EndTimeMM);
            cy.get('[formcontrolname="endTime"] .period-control__button').eq(index).click();
            
            cy.get('.period-selector >li> .period-selector__button', { withinSubject: $row }).each($button => {
              const buttonText = $button.text().trim();
              if (buttonText === items[index].End_Period_Selector) {
                cy.wrap($button).click();
              }
            });

            cy.get('[placeholder="In Time Grace"]', { withinSubject: $row }).type(items[index].In_Time_Grace);
            cy.get('[placeholder="Out Time Grace"]', { withinSubject: $row }).type(items[index].Out_Time_Grace);

          } catch (error) {
            cy.log(`Error filling session row ${index + 1}:`, error.message);
          }
        }

        function addAndFillSessions(items) {
          cy.log(items, 'Adding and filling sessions');
          for (let i = 0; i < items.length; i++) {
            cy.xpath('//div[@class="ah-add-repeater-left"]//div[@class="col-2"]').eq(i).should('exist').then($row => {
              fillSessionRow($row, i);
            });
            if (i < items.length - 1) {
              cy.get(":nth-child(5)> .ah-btn").click();
            }
          }
        }

        addAndFillSessions(items);
        singleshift(items);
      });

      function singleshift() {
        try {
          if (items.length === 1) {
            cy.get(':nth-child(1)> .ah-btn').should('be.visible').click();
          } else {
            cy.Dropdown("Duration Calculated Method", "Sum of the duration of the each session");
            cy.get(':nth-child(1)> .ah-btn').should('be.visible').click();
          }
        } catch (error) {
          cy.log('Error handling single shift or dropdown selection:', error.message);
        }
      }
    } catch (error) {
      cy.log('Test failed due to unexpected error:', error.message);
    }
  });
});
