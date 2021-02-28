import React from 'react'

import { apiGetPosts } from './apis/postsAPI'

function App() {
  const [posts, setPosts] = React.useState([])

  const fetchMorePosts = async () => {
    try {
      const { data = [] } = await apiGetPosts()

      setPosts(
        data.map((post) => ({
          id: post?.id,
          title: post?.title,
          excerpt: post?.excerpt
        }))
      )
    } catch (err) {
      console.error(err)
    }
  }

  React.useEffect(() => {
    fetchMorePosts()
  }, [])

  return (
    <main>
      {posts.map((post) => (
        <article>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </main>
  )
}

export default App
