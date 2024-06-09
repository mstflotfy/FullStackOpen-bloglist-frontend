import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, test } from 'vitest'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

/*
5.14: Blog List Tests, step 2

Make a test, which checks that the blog's URL and number of likes are shown when the button controlling the shown details has been clicked.
*/

describe('<Blog />', () => {
  let container

  const blog = {
    title: 'test blog title',
    author: 'mstflotfy',
    url: '/test-blog',
    likes: 200,
    user: {
      username: 'mstflotfy'
    }
  }

  const user = {
    username: 'mstflotfy'
  }

  beforeEach(() => {
    container = render(<Blog blog={blog} user={user} />).container
  })

  test('Rednders blog\'s title & author, and does not render url or likes, by default', () => {
    expect(container).toHaveTextContent(blog.title)
    expect(container).toHaveTextContent(blog.author)
    expect(container).not.toHaveTextContent(blog.url)
    expect(container).not.toHaveTextContent(blog.likes)
  })

  test('url & likes appear when view button is clicked', async () => {
    const user = userEvent.setup()
    const showButton = screen.getByText('view')

    await user.click(showButton)

    expect(container).toHaveTextContent(blog.url)
    expect(container).toHaveTextContent(blog.likes)
  })
})