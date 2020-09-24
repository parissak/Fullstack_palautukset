Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', 'http://localhost:3003/api/login', {
        username, password
    }).then(({ body }) => {
        localStorage.setItem('loggedUser', JSON.stringify(body))
        cy.visit('http://localhost:3003')
    })
})

Cypress.Commands.add('createNote', ({ title, author, url, likes }) => {
    cy.request({
        url: 'http://localhost:3003/api/blogs',
        method: 'POST',
        body: { title: title, author: author, url: url, likes: likes },
        headers: {
            'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}`
        }
    })

    cy.visit('http://localhost:3003')
})