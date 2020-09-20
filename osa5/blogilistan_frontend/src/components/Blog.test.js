import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Blog-component ', () => {
    let component
    const mockHandler = jest.fn()

    const blog = {
        title: 'title test',
        author: 'testAuthor',
        url: 'www.someurl.com',
        likes: '0',
        user: { username: 'someUser' }
    }

    beforeEach(() => {
        component = render(
            <Blog blog={blog} updateBlogLike={mockHandler} />
        )
    })

    test('by default renders only title and author', () => {
        const div = component.container.querySelector('.visible')
        expect(div).toHaveTextContent('title test by testAuthor')
        expect(div).not.toHaveTextContent('www.someurl.com')
        expect(div).not.toHaveTextContent('0')
    })


    test('clicking "show"/-button renders title, author, url and likes', () => {
        const button = component.getByText('show')
        fireEvent.click(button)
        const visbible = component.container.querySelector('.visible')
        const nonVisible= component.container.querySelector('.nonVisible')
        expect(visbible).toHaveTextContent('title test by testAuthor')
        expect(nonVisible).toHaveTextContent('www.someurl.com')
        expect(nonVisible).toHaveTextContent('0')
    })

    test('clicking "like"-button calls event handler twice', async () => {
        const button = component.getByText('like')
        fireEvent.click(button)
        fireEvent.click(button)
        expect(mockHandler.mock.calls).toHaveLength(2)
    })

})