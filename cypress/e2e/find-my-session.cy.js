describe('Schedule of Web Summer Camp', () => {
  it('should find my session at the schedule', () => {

    // #3: Polishing - API waiting
    cy.intercept({
      method: 'GET',
      url: 'https://forms.hsforms.com/embed/v3/form/**/**/*'
    }).as('formsCall');

    // #1: Direct step
    cy.visit('/');
    // #2: Polishing - Waiting for UI
    cy.contains('.title', 'Web Summer Camp 2022').should('be.visible');
    cy.get('.closed').should('be.visible');

    // #1: Direct step
    cy.get('.closed').click();

    // #1: Direct step
    cy.contains('.main-navigation a', 'Program').click();
    // #2: Polishing - Waiting for UI
    cy.contains('.table.day-two tr', 'By Ramona Schwering').scrollIntoView();

    // #1: Direct step
    cy.get('a[href="/end-to-end-testing-as-it-should-be-an-introduction-to-cypress"]').click();

    // #1: Direct step (already better waiting, so use as transition)
    cy.contains('p', 'End-To-End Testing').should('be.visible');
    // #2: Polishing - Waiting for UI
    cy.get('.image').scrollIntoView();

    // #3: Polishing - API waiting
    cy.wait('@formsCall').its('response.statusCode').should('eq', 200);

    // #1: Direct step
    cy.contains('.name', 'Ramona Schwering').should('be.visible');
  });
});