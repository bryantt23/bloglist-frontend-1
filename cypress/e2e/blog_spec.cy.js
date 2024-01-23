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

  describe('When logged in', function() {
    beforeEach(function() {
      // Log in
      cy.get('input[type="text"]').type('testuser')
      cy.get('input[type="password"]').type('testpassword')
      cy.get('button').contains('Login').click()
    })

    it('A blog can be created', function() {
      // Open the form to create a new blog (adjust this if your app has a specific way to open the form)
      cy.contains('button', 'add blog').click() // Adjust the button text if necessary

      // Fill in the form
      cy.get('[data-testid="title-input"]').type('New Cypress Blog')
      cy.get('[data-testid="author-input"]').type('Cypress Tester')
      cy.get('[data-testid="url-input"]').type('http://testblog.com')

      // Submit the form
      cy.get('button').contains('add').click()

      // Verify the blog was added (adjust this to match how a new blog is displayed in your app)
      cy.contains('New Cypress Blog by Cypress Tester')
    })
  })
})