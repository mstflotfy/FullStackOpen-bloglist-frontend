
  const LoginForm = ({handleSubmit, username, handleUsernameChange, handlePasswordChange, password}) => (
    <form onSubmit={handleSubmit}>
      <div>
        <input 
          type='text' 
          value={username} 
          placeholder='Username' 
          name='Username'
          onChange={handleUsernameChange} 
          autoComplete='given-name'
        />
      </div>
      <div>
        <input 
          type='password' 
          value={password} 
          placeholder='Password' 
          name='Password'
          onChange={handlePasswordChange} 
          autoComplete='off'
        />
      </div>
      <button type='submit'>Login In</button>
    </form>
  )

export default LoginForm
