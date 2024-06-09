import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import Blog from './Blog'

/*
5.13: Blog List Tests, step 1

Make a test, which checks that the component displaying a blog renders the blog's title and author, but does not render its URL or number of likes by default.

Add CSS classes to the component to help the testing as necessary.
*/

describe('<Blog />', () => {
  test('Rednders blog\'s title & author, and does not render url or likes', () => {
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

    const { container } = render(<Blog blog={blog} user={user}/>)
    expect(container).toHaveTextContent(blog.title)
    expect(container).toHaveTextContent(blog.author)
    expect(container).not.toHaveTextContent(blog.url)
    expect(container).not.toHaveTextContent(blog.likes)
    screen.debug()
  })
})