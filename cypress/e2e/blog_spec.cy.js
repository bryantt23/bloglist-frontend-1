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

it('A blog can be created, liked, and deleted', function() {
  // Open the form to create a new blog
  cy.contains('button', 'add blog').click()

  // Fill in the form
  cy.get('[data-testid="title-input"]').type('New Cypress Blog')
  cy.get('[data-testid="author-input"]').type('Cypress Tester')
  cy.get('[data-testid="url-input"]').type('http://testblog.com')

  // Submit the form
  cy.get('button').contains('add').click()

  // Verify the blog was added
  cy.contains('New Cypress Blog by Cypress Tester')

  // Wait for blog to load and display details
  cy.wait(1000) // Adjust based on your app's behavior
  cy.contains('button', 'Show details').click()

  // Like the blog
  cy.get('.blog-like-button').click() // Use a class or unique identifier for the like button
  cy.contains('Likes: 1') // Check if the likes count has been incremented

  // Delete the blog
  cy.get('.blog-delete-button').click() // Use a class or unique identifier for the delete button
  cy.on('window:confirm', () => true) // Handle the confirmation dialog
  cy.contains('New Cypress Blog by Cypress Tester').should('not.exist') // Check if the blog is removed
})





  })
})