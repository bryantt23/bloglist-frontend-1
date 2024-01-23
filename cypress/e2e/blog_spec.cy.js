describe('Blog app', function() {
  beforeEach(function() {
    // Reset the database
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    // Create a new user
    const user = {
      name: 'Test User',
      username: 'testuser',
      password: 'testpassword'
    }
    cy.request('POST', 'http://localhost:3003/api/users/sign-up', user)

    // Visit the application
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
 
  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('input[type="text"]').type('testuser')
      cy.get('input[type="password"]').type('testpassword')
      cy.get('button').contains('Login').click()

  // Check for a "Logout" button to verify successful login
  cy.contains('button', 'Logout').should('be.visible')
    })

    it('fails with wrong credentials', function() {
      cy.get('input[type="text"]').type('wronguser')
      cy.get('input[type="password"]').type('wrongpassword')
      cy.get('button').contains('Login').click()

  // Check for the presence of the login form again
  cy.get('input[type="text"]').should('be.visible')
  cy.get('input[type="password"]').should('be.visible')
    })
  })
})