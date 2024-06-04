import { forwardRef, useImperativeHandle, useState } from "react"

const Togglable = forwardRef(({ showButtonText, children}, refs) => {
  const [show, setShow] = useState(false)

  const toggleVisiblity = () => setShow(!show)

  useImperativeHandle(refs, () => {
    return {
      toggleVisiblity
    }
  })

  return (
    <div>
      {
        show ?
        <div>
          {children}
          <button onClick={toggleVisiblity}>Cancel</button>
        </div> :
        <div>
          <button onClick={toggleVisiblity}>{showButtonText}</button>
        </div>
      }
    </div>
  )
})

export default Togglable