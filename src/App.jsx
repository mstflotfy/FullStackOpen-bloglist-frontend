import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import CreateBlog from './components/CreateBlog'
import Notification from './components/notification'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const [notificationMsg, setNotificationMsg] = useState('')
  const [notificationError, setNotificationError] = useState(false)

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

  const handleSubmitBlog = async (event) => {
    event.preventDefault()

    const newBlog = {title: newBlogTitle, author: newBlogAuthor, url: newBlogUrl}

    try {
      await blogService.createNew(newBlog)

      // Refetch Blogs
      fetchBlogs()

      // clear input fields
      setNewBlogTitle('')
      setNewBlogAuthor('')
      setNewBlogUrl('')

      handleNotification(`Added a new blog post: '${newBlogTitle}' by ${newBlogAuthor}`)

    } catch (error) {
      handleNotification('Could not add new blog post. ' + `Error: ${error}`, true)
    }
  }

  const handleNotification = (msg, error = false) => {
    setNotificationMsg(msg)
    setNotificationError(error)
    setTimeout(() => {
      setNotificationMsg('')
    }, 5000)
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

          <CreateBlog 
            newBlogTitle={newBlogTitle}
            newBlogUrl={newBlogUrl}
            newBlogAuthor={newBlogAuthor}
            handleNewBlogTitleChange={({target}) => setNewBlogTitle(target.value)}
            handleNewBlogAuthorChange={({target}) => setNewBlogAuthor(target.value)} 
            handleNewBlogUrlChange={({target}) => setNewBlogUrl(target.value)}
            handleSubmit={handleSubmitBlog}
          />

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
