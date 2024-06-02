import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

const createNew = async (blog) => {
 const config = {
  headers: { Authorization: token }
 } 

 const request = axios.post(baseUrl, blog, config)
 return request.data
}

export default { getAll, setToken, createNew }