import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const login = async (event) => {
    event.preventDefault()

    const credentials = {username, password}

    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('bloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      setUser(user)
    } catch (exception) {
      console.error(exception)
    }

  }

  useEffect(() => {
    if (user) {
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )  
    }
  }, [user])

  useEffect(() => {
    const userLogged = JSON.parse(localStorage.getItem('bloglistUser'))
    if (userLogged) {
      setUser(userLogged)
      blogService.setToken(userLogged.token)
    }
    
  }, [])

  const logout = () => {
    window.localStorage.removeItem('bloglistUser')
    setUser(null)
  }
  return (
    <div>
      <h1>BLOG LIST APP</h1>
      {!user ? 
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={login}
        /> :
        <div>
          <small>Hey, {user.name}</small>
          <button onClick={logout}>Log Out</button>

          <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
    </div>
  )
}

export default App