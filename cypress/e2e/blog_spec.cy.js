describe('Blog app', function () {
  beforeEach(function () {
    // Reset the database
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    // Create a new user
    const user = {
      name: 'Test User',
      username: 'testuser',
      password: 'testpassword'
    }
    cy.request('POST', 'http://localhost:3003/api/users/sign-up', user)

    // Create another user
    const user2 = {
      name: 'Test User 2',
      username: 'anotheruser',
      password: 'anotherpassword'
    }
    cy.request('POST', 'http://localhost:3003/api/users/sign-up', user2)

    // Visit the application
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function () {
    cy.contains('username')
    cy.contains('password')

    cy.get('input[type="text"]').should('be.visible').and('have.value', '')
    cy.get('input[type="password"]').should('be.visible').and('have.value', '')

    cy.get('button').contains('Login').should('be.visible')
  })

  describe('When logged in', function () {
    beforeEach(function () {
      // Log in
      cy.get('input[type="text"]').type('testuser')
      cy.get('input[type="password"]').type('testpassword')
      cy.get('button').contains('Login').click()

      // Add a wait here
      cy.wait(1000) // Adjust the wait time based on your app's behavior
    })

    it('A blog can be created, liked, and deleted', function () {
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

    it('Only the creator can see the delete button of a blog', function () {
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

      // Check that the delete button is visible for the creator
      cy.get('.blog-delete-button').should('be.visible')

      // Log out the current user
      cy.contains('Logout').click()

      // Log in as a different user (anotheruser)
      cy.get('input[type="text"]').type('anotheruser')
      cy.get('input[type="password"]').type('anotherpassword')
      cy.get('button').contains('Login').click()

      // Wait for the login to complete
      cy.wait(1000) // Adjust based on your app's behavior

      // Visit the blog that was created by the first user
      cy.contains('button', 'Show details').click()

      // Check that the delete button is not visible for the non-creator user
      cy.get('.blog-delete-button').should('not.exist')
    })

    it('Blogs are ordered by likes with the most likes first', function () {
      // Create multiple blogs with different like counts
      cy.createBlog('Blog 1', 'Author 1', 'http://blog1.com', 5)
      cy.createBlog('Blog 2', 'Author 2', 'http://blog2.com', 10)
      cy.createBlog('Blog 3', 'Author 3', 'http://blog3.com', 2)

      // Visit the main page
      cy.visit('http://localhost:5173')

      // Wait for the blogs to load
      cy.wait(1000) // Adjust based on your app's behavior

      // Check that the blogs are ordered correctly
      cy.get('.blog-title').first().should('contain', 'Blog 2') // Blog 2 has the most likes
      cy.get('.blog-title').eq(1).should('contain', 'Blog 1') // Blog 1 has the second most likes
      cy.get('.blog-title').eq(2).should('contain', 'Blog 3') // Blog 3 has the least likes
    })

    Cypress.Commands.add('createBlog', (title, author, url, likes) => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:3003/api/blogs',
        body: {
          title,
          author,
          url,
          likes,
        },
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('loggedBlogAppUser')).token}`,
        },
      })
    })
  })
})
