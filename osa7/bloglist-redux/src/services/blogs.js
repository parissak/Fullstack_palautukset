import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const post = async content => {
    const config = { headers: { Authorization: token } }
    const response = await axios.post(baseUrl, content, config)
    return response.data
}

const put = async blog => {
    const response = await axios.put(`${baseUrl}/${blog.id}`, blog)
    return response.data
}

const remove = async id => {
    const config = { headers: { Authorization: token } }
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
}

const comment = async (id, comment) => {
    const response = await axios.post(`${baseUrl}/${id}/comments`, comment)
    return response.data
}

export default { setToken, getAll, post, put, remove, comment }