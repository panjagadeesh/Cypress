class AddShiftPage {
    // Locators
    elements = {
      addShiftButton: () => cy.get('.ah-btn-set > .ah-btn'),
      shiftNameInput: () => cy.get('.form-group-lg > #name'),
      shiftCodeInput: () => cy.get('#code'),
      fullDayHours: () => cy.get('[formcontrolname="fullDay_hrs"]'),
      fullDayMinutes: () => cy.get('[formcontrolname="fullDay_min"]'),
      halfDayHours: () => cy.get('[formcontrolname="halfDay_hrs"]'),
      halfDayMinutes: () => cy.get('[formcontrolname="halfDay_min"]'),
      basicCheckbox: () => cy.get('#basic'),
      addNewSessionButton: () => cy.get(":nth-child(4)> .ah-btn"),
      saveShiftButton: () => cy.get(':nth-child(1)> .ah-btn'),
    };
  
    //  Methods
    clickAddShift() {
      this.elements.addShiftButton().click();
    }
  
    fillShiftDetails(items) {
      const { Inputshift, Inputcode,MinHHFullday,MinMMFullday,MinHHhalfday,MinMMhalfday} = items
      this.elements.shiftNameInput().type(Inputshift);
      this.elements.shiftCodeInput().type(Inputcode);
      this.elements.fullDayHours().type(MinHHFullday);
      this.elements.fullDayMinutes().type(MinMMFullday);
      this.elements.halfDayHours().type(MinHHhalfday);
      this.elements.halfDayMinutes().type(MinMMhalfday);
      this.elements.basicCheckbox().click();
    }
  
    clickAddNewSession() {
      this.elements.addNewSessionButton().click();
    }
  
    saveShift() {
      this.elements.saveShiftButton().click();
    }
  
    fillSessionRow($row, sessionData) {
      cy.wrap($row).find('[placeholder="Enter Session Name"]').type(sessionData.sessionName);
      cy.wrap($row).find('[formcontrolname="startTime"] [placeholder="HH"]').type(sessionData.StartTimeHH);
      cy.wrap($row).find('[formcontrolname="startTime"] [placeholder="MM"]').type(sessionData.StartTimeMM);
      cy.wrap($row).find('[formcontrolname="startTime"] .period-control__button').click();
  
      cy.wrap($row).find('.period-selector >li> .period-selector__button').each($button => {
        if ($button.text().trim() === sessionData.Start_Period_Selector) {
          cy.wrap($button).click();
        }
      });
  
      cy.wrap($row).find('[formcontrolname="endTime"] [placeholder="HH"]').type(sessionData.EndTimeHH);
      cy.wrap($row).find('[formcontrolname="endTime"] [placeholder="MM"]').type(sessionData.EndTimeMM);
      cy.wrap($row).find('[formcontrolname="endTime"] .period-control__button').click();
  
      cy.wrap($row).find('.period-selector >li> .period-selector__button').each($button => {
        if ($button.text().trim() === sessionData.End_Period_Selector) {
          cy.wrap($button).click();
        }
      });
  
      cy.wrap($row).find('[placeholder="In Time Grace"]').type(sessionData.In_Time_Grace);
      cy.wrap($row).find('[placeholder="Out Time Grace"]').type(sessionData.Out_Time_Grace);
    }
  
    addAndFillSessions(items) {
      cy.log(items,"fdsfdsf")
      for (let i = 0; i < items.length; i++) {
        cy.get(`div.row.ng-untouched.ng-pristine.ng-invalid.ng-star-inserted:nth-of-type(${i + 1}) div.col-2`)
          .should('exist')
          .then($row => {
            this.fillSessionRow($row, items[i]);
          });
  
        if (i < items.length - 1) {
          this.clickAddNewSession();
        }
      }
    }
  
    handleSingleShift(items) {
      if (items.length === 1) {
        this.saveShift();
      } else {
        cy.Dropdown("Duration Calculated Method", "Sum of the duration of the each session");
        this.saveShift();
      }
    }
  }
  
  export default AddShiftPage;
  