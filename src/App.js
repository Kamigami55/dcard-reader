import React from 'react'

import { apiGetPosts } from './apis/postsAPI'

function App() {
  const [posts, setPosts] = React.useState([])
  const [page, setPage] = React.useState(1)
  const [isFetching, setIsFetching] = React.useState(false)

  const fetchMorePosts = async () => {
    if (isFetching) return

    setIsFetching(true)
    try {
      const idOfLastPost = posts.length > 0 ? posts[posts.length - 1].id : null
      const { data = [] } = await apiGetPosts(idOfLastPost)

      setPosts([
        ...posts,
        ...data.map((post) => ({
          id: post.id,
          title: post.title,
          excerpt: post.excerpt
        }))
      ])
    } catch (err) {
      window.console.error(err)
    }
    setIsFetching(false)
  }

  React.useEffect(() => {
    fetchMorePosts()
  }, [page])

  const loader = React.useRef(null)

  const handleObserver = (entities) => {
    const target = entities[0]
    if (target.isIntersecting) {
      setPage((prevPage) => prevPage + 1)
    }
  }

  React.useEffect(() => {
    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0
    }
    // initialize IntersectionObserver
    // and attaching to Load More div
    const observer = new window.IntersectionObserver(handleObserver, options)
    if (loader.current) {
      observer.observe(loader.current)
    }
  }, [])

  return (
    <main>
      {posts.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}

      <div className='loading' ref={loader}>
        <h2>Loading...</h2>
      </div>
    </main>
  )
}

export default App
