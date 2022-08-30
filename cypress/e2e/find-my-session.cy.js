describe('Schedule of Web Summer Camp', () => {
  it('should find my session at the schedule', () => {

    // #3: Polishing - API waiting
    cy.intercept({
      method: 'GET',
      url: 'https://forms.hsforms.com/embed/v3/form/**/**/*'
    }).as('formsCall');

    // Open menu
    cy.visit('/');
    cy.contains('.title', 'Web Summer Camp 2022').should('be.visible');
    cy.get('.closed').should('be.visible');
    cy.get('.closed').click();

    // Find session in schedule
    cy.contains('.main-navigation a', 'Program').click();
    cy.contains('.table.day-two tr', 'By Ramona Schwering').scrollIntoView();

    // Open and verify schedule
    cy.get('a[href="/end-to-end-testing-as-it-should-be-an-introduction-to-cypress"]').click();
    cy.contains('p', 'End-To-End Testing').should('be.visible');
    cy.get('.image').scrollIntoView();
    cy.wait('@formsCall').its('response.statusCode').should('eq', 200);
    cy.contains('.name', 'Ramona Schwering').should('be.visible');
  });
});