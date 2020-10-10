import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import BlogForm from '../components/BlogForm'
import styled from 'styled-components'

const List = styled.ul`
list-style: none;
padding: 10px 0px;
`
const ListItem = styled.li`
padding: 5px;
border-bottom: 1px solid;
&:hover {background-color: white;};
width: 40%;
`
const BlogList = () => {
    const user = useSelector(({ user }) => user)

    const blogs = useSelector(({ blogs }) => {
        blogs.sort(function (a, b) {
            return b.likes - a.likes
        })
        return blogs
    })

    return (
        <div>
            <h2>blogs</h2>
            <List>
                {blogs.map(blog =>
                    <ListItem key={blog.id}>
                        <Link to={`/blogs/${blog.id}`}> {blog.title} </Link>
                    </ListItem>
                )}
            </List>
            {user && <BlogForm />}
        </div>
    )
}
export default BlogList