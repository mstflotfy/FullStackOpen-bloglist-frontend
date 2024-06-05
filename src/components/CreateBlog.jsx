import blogService from '../services/blogs'
import { useState } from 'react'

const Createblog = ({ handleNotification, fetchBlogs, newPostRef }) => {

  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

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

    newPostRef.current.toggleVisiblity()
  }

  return (
    <form onSubmit={handleSubmitBlog}>
      <h2>Create Blog</h2>
      <div>
        <label>Title</label>
        <input 
          type="text" 
          value={newBlogTitle}
          name="Title"
          onChange={(event) => setNewBlogTitle(event.target.value)}
        />
      </div>
      <div>
        <label>Author</label>
        <input
          type="text"
          name="Title"
          value={newBlogAuthor}
          onChange={(event) => setNewBlogAuthor(event.target.value)}
        />
      </div>
      <div>
        <label>URL</label>
        <input
          type="text"
          name="Title"
          value={newBlogUrl}
          onChange={(event) => setNewBlogUrl(event.target.value)}
        />
      </div>
      <button>Create</button>
    </form>
  )
}

export default Createblog