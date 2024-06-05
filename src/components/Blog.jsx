import Togglable from "./Togglable"
import blogService from '../services/blogs'

const Blog = ({ blog, handleIncrementLikes }) => {


  const listItemStyle = {
    display: 'flex',
    gap: '1.2rem',
  }

  return (
    <div className="Blog">
      {blog.title} 
      <Togglable
        showButtonText="view"
      >
        <div className="Blog__details">
          <p>
            URL: {blog.url}
          </p>
          <p style={listItemStyle}>
            Likes: {blog.likes}
            <button onClick={() => handleIncrementLikes(blog)}>Likes</button>
          </p>
          <p>
            Author: {blog.author}
          </p>
        </div>
      </Togglable>
    </div>  
  )
}

export default Blog
