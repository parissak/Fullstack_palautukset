import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'


test('BlogForm creates new blog with correct information', () => {
    const addBlog = jest.fn()

    const component = render(
        <BlogForm addBlog={addBlog} />
    )

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(title, {
        target: { value: 'test title' }
    })

    fireEvent.change(author, {
        target: { value: 'test author' }
    })

    fireEvent.change(url, {
        target: { value: 'test url' }
    })

    fireEvent.submit(form)

    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0].title).toBe('test title')
    expect(addBlog.mock.calls[0][0].author).toBe('test author')
    expect(addBlog.mock.calls[0][0].url).toBe('test url')
    expect(addBlog.mock.calls[0][0].url).not.toBe('something else')
})
