import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const config = () => { 
  return { headers: { Authorization: token } }
}

const getAll = () => {
  const request = axios.get(baseUrl, config())
  return request.then(response => response.data)
}

const createNew = async (blog) => {
 const response = await axios.post(baseUrl, blog, config())
 return response.data
}

const update = async (blog, id) => {
 const response = await axios.put(`${baseUrl}/${id}`, blog, config())
 return response.data
}

const deleteBlog = async (id) => {
 const response = await axios.delete(`${baseUrl}/${id}`, config())
 return response.data
}

export default { getAll, setToken, createNew, update, deleteBlog }