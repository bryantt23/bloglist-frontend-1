describe('Blog app', function() {
  beforeEach(function() {
    // cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('username') // Checks if the text 'username' is present
    cy.contains('password') // Checks if the text 'password' is present

    // Asserts that the username input is visible and functional
    cy.get('input[type="text"]').should('be.visible').and('have.value', '')

    // Asserts that the password input is visible and functional
    cy.get('input[type="password"]').should('be.visible').and('have.value', '')

    // Checks if the login button is visible and contains the text 'Login'
    cy.get('button').contains('Login').should('be.visible')
  })
})
