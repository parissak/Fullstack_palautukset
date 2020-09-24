describe('Blog ', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = { name: 'tester', username: 'tester', password: 'tester' }
        cy.request('POST', 'http://localhost:3003/api/users', user)
        cy.visit('http://localhost:3003')
    })

    it('Login form is shown', function () {
        cy.get('#loginForm')
    })

    describe('Login ', function () {
        it('succeeds with correct credentials', function () {
            cy.get('#username').type('tester')
            cy.get('#password').type('tester')
            cy.get('#login-button').click()
            cy.contains('tester logged in')
        })

        it('fails with wrong credentials', function () {
            cy.get('#username').type('tester')
            cy.get('#password').type('nottester')
            cy.get('#login-button').click()

            cy.get('.message')
                .should('contain', 'wrong username or password')
                .and('have.css', 'color', 'rgb(255, 0, 0)')

            cy.get('html').should('not.contain', 'tester logged in')
        })
    })

    describe('When logged in ', function () {
        beforeEach(function () {
            cy.login({ username: 'tester', password: 'tester' })
        })

        it('A blog can be created', function () {
            cy.get('#buttonShow').click()
            cy.get('#title').type('someTitle')
            cy.get('#author').type('someAuthor')
            cy.get('#url').type('someUrl')
            cy.get('#buttonCreate').click()
            cy.contains('someTitle')
        })

        it('Created blog can be liked', function () {
            cy.createNote({ title: 'likeMe', author: 'likeMe', url: 'likeMe' })
            cy.get('#showBlogButton').click()
            cy.get('#likeBlogButton').click()
            cy.contains('likes: 1')
        })

        it('Created blog can be removed', function () {
            cy.createNote({ title: 'removeMe', author: 'removeMe', url: 'removeMe' })
            cy.get('#showBlogButton').click()
            cy.get('#removeBlogButton').click()
            cy.get('html').should('not.contain', 'removeMe')
        })

        it('Created blogs are sorted by likes', function () {
            cy.createNote({ title: 'first', author: 'first', url: 'first', likes: 1 })
            cy.createNote({ title: 'second', author: 'second', url: 'second', likes: 2 })
            cy.createNote({ title: 'third', author: 'third', url: 'third', likes: 3 })

            cy.get('.blog').then(blogs => {
                cy.wrap(blogs[0]).should('contain', '3')
                cy.wrap(blogs[0]).should('not.contain', '1')
                cy.wrap(blogs[1]).should('contain', '2')
                cy.wrap(blogs[2]).should('contain', '1')
            })
        })
    })
})