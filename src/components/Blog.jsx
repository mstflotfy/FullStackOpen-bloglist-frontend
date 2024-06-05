import Togglable from "./Togglable"
import blogService from '../services/blogs'

const Blog = ({ blog, handleIncrementLikes, handleDeletePost, user }) => {


  const isOwner = () => {
    return blog.user.username === user.username
  }

  const listItemStyle = {
    display: 'flex',
    gap: '1.2rem',
    alignItems: 'center'
  }

  return (
    <div className="Blog">
      <h3>
        {blog.title} 
      </h3>
      <Togglable
        showButtonText="view"
      >
        <div className="Blog__details">
          <p>
            URL: {blog.url}
          </p>
          <p style={listItemStyle}>
            Likes: {blog.likes}
            <button onClick={() => handleIncrementLikes(blog)}>Like</button>
          </p>
          <p>
            Author: {blog.author}
          </p>
        </div>
        {
          isOwner() && 
          <button className="del" onClick={() => handleDeletePost(blog)}>Delete Post</button>
        }
        
      </Togglable>
    </div>  
  )
}

export default Blog
