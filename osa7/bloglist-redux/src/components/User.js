import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const List = styled.ul`
list-style: none;
padding: 10px;
`
const ListItem = styled.li`
padding: 0px 0px 5px;
`

const User = () => {
    const users = useSelector(({ users }) => users)
    const id = useParams().id
    const user = users.find(u => u.id === id)

    if (!user) {
        return (
            <div>
                <p>Loading...</p>
            </div>)
    }

    return (
        <div>
            <h2>{user.name}</h2>
            <p>added blogs</p>
            <List>
                {user.blogs.map(blog =>
                    <ListItem key={blog.id}> {blog.title} </ListItem>)}
            </List>
        </div>
    )

}

export default User