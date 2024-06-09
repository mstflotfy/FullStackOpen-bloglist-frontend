import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

/*
5.15: Blog List Tests, step 3

Make a test, which ensures that if the like button is clicked twice, the event handler the component received as props is called twice.
*/

describe('<Blog />', () => {
  let container
  const actingUser = userEvent.setup()
  let showButton

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

  const handleLike = vi.fn()
  const handleDel = vi.fn()

  beforeEach(() => {
    container = render(
      <Blog blog={blog} user={user} handleIncrementLikes={handleLike} handleDeletePost={handleDel} />
    ).container
    showButton = screen.getByText('view')
  })

  test('Rednders blog\'s title & author, and does not render url or likes, by default', () => {
    expect(container).toHaveTextContent(blog.title)
    expect(container).toHaveTextContent(blog.author)
    expect(container).not.toHaveTextContent(blog.url)
    expect(container).not.toHaveTextContent(blog.likes)
  })

  test('url & likes appear when view button is clicked', async () => {

    await actingUser.click(showButton)

    expect(container).toHaveTextContent(blog.url)
    expect(container).toHaveTextContent(blog.likes)
  })

  test('when like is pressed twice the handleLike event is called twice', async () => {
    await actingUser.click(showButton)
    const likeButton = screen.getByText('Like')

    await actingUser.dblClick(likeButton)

    expect(handleLike.mock.calls).toHaveLength(2)
    // or
    expect(handleLike).toHaveBeenCalledTimes(2)
  })
})