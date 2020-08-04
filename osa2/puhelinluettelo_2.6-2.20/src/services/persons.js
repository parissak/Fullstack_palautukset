import axios from 'axios'
const baseUrl = '/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (personObject) => {
    const request = axios.post(baseUrl, personObject)
    return request.then(response => response.data)
}

const update = (personObject) => {
    const request = axios.put(baseUrl + '/' + personObject.id, personObject)
    return request.then(response => response.data)
}

const remove = (personId) => {
    const request = axios.delete(baseUrl + '/' + personId)
    return request.then(response => response.data)
}

export default {getAll, create, remove, update}