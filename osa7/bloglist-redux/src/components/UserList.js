import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const Table = styled.table`
border-collapse: collapse;
text-align: left;
width: 60vw;
`
const Row = styled.tr`
&:hover {background-color: white;}
`

const Cell = styled.td`
border: 1px solid #ddd;
padding: 8px;
`

const UserList = () => {
    const users = useSelector(({ users }) => users)

    if (users.length === 0) {
        return (
            <div>
                <h2>Users</h2>
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <div>
            <h2>Users</h2>
            <Table>
                <tr>
                    <th>user</th>
                    <th>blogs created</th>
                </tr>
                {users.map(user =>
                    <Row key={user.id}>
                        <Cell> <Link to={`/users/${user.id}`}> {user.name} </Link></Cell>
                        <Cell> {user.blogs.length} </Cell>
                    </Row>
                )}
            </Table>
        </div>
    )

}

export default UserList