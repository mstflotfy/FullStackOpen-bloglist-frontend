import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const LoginForm = () => (
    <form onSubmit={login}>
      <div>
        <input 
          type='text' 
          value={username} 
          placeholder='Username' 
          name='Username'
          onChange={(event) => setUsername(event.target.value)} 
          autoComplete='given-name'
        />
      </div>
      <div>
        <input 
          type='password' 
          value={password} 
          placeholder='Password' 
          name='Password'
          onChange={({target}) => setPassword(target.value)} 
          autoComplete='off'
        />
      </div>
      <button type='submit'>Login In</button>
    </form>
  )

  const login = async (event) => {
    event.preventDefault()

    const credentials = {username, password}

    try {
      const user = await loginService.login(credentials)
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

  return (
    <div>
      <h1>BLOG LIST APP</h1>
      {!user ? 
        LoginForm() : 
        <div>
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