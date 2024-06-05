import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import CreateBlog from './components/CreateBlog'
import Notification from './components/notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [notificationMsg, setNotificationMsg] = useState('')
  const [notificationError, setNotificationError] = useState(false)

  const newPostRef = useRef()

  const fetchBlogs = () => {
    blogService
      .getAll()
      .then(blogs =>setBlogs( blogs ))  
      .catch((error) => {
        handleNotification('Please sign in again.' + `Error: ${error}`, true)

        // handle expired token
        setUser(null)
        localStorage.removeItem('bloglistUser')
      })
  }

  useEffect(() => {
    if (user) {
      fetchBlogs()
    }
  }, [user])

  useEffect(() => {
    const userLogged = JSON.parse(localStorage.getItem('bloglistUser'))
    if (userLogged) {
      setUser(userLogged)
      blogService.setToken(userLogged.token)
    }
    
  }, [])

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
      handleNotification('Wrong username or password. ' + `Error: ${exception}`, true)
    }

  }

  const logout = () => {
    window.localStorage.removeItem('bloglistUser')
    setUser(null)
  }

  const handleNotification = (msg, error = false) => {
    setNotificationMsg(msg)
    setNotificationError(error)
    setTimeout(() => {
      setNotificationMsg('')
    }, 5000)
  }

  const handleIncrementLikes = async (blog) => {
    const updatedBlog = {
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    try {
      const updated = await blogService.update(updatedBlog, blog.id) 
      setBlogs(
        blogs.map(b => b.id === blog.id ? updated : b)
      )
      handleNotification(`${updated.title} got ${updated.likes}`)
    } catch (error) {
      handleNotification(`Could not add like! Error: ${error}`, true)
    }
  }

  return (
    <div>
      <h1>BLOG LIST APP</h1>

      {notificationMsg && 
        <Notification msg={notificationMsg} error={notificationError}/>
      }

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

          <Togglable
            showButtonText="New Blog"
            ref={newPostRef}
          >
          <CreateBlog 
            handleNotification={handleNotification}
            fetchBlogs={fetchBlogs}
            newPostRef={newPostRef}
          />
          </Togglable>
          <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} handleIncrementLikes={handleIncrementLikes}/>
          )}
        </div>
      }
    </div>
  )
}

export default App
