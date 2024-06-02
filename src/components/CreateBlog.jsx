const Createblog = ({handleSubmit, newBlogTitle, handleNewBlogTitleChange, handleNewBlogAuthorChange, newBlogUrl, handleNewBlogUrlChange, newBlogAuthor}) => (
  <form onSubmit={handleSubmit}>
    <h2>Create Blog</h2>
    <div>
      <label>Title</label>
      <input 
        type="text" 
        value={newBlogTitle}
        name="Title"
        onChange={handleNewBlogTitleChange}
      />
    </div>
    <div>
      <label>Author</label>
      <input 
        type="text" 
        name="Title"
        value={newBlogAuthor}
        onChange={handleNewBlogAuthorChange}
      />
    </div>
    <div>
      <label>URL</label>
      <input 
        type="text" 
        name="Title"
        value={newBlogUrl}
        onChange={handleNewBlogUrlChange}
      />
    </div>
    <button>Create</button>
  </form>
)

export default Createblog