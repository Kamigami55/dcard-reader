import React from 'react'

import { apiGetPosts } from './apis/postsAPI'

import Page from './components/Page'
import PostsContainer from './components/PostsContainer'
import Post from './components/Post'
import Loader from './components/Loader'

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

      setPosts((prevPosts) => [
        ...prevPosts,
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
      threshold: 0
    }
    // initialize IntersectionObserver
    // and attaching to Load More div
    const observer = new window.IntersectionObserver(handleObserver, options)
    if (loader.current) {
      observer.observe(loader.current)
    }
  }, [])

  return (
    <Page>
      <PostsContainer>
        {posts.map((post) => (
          <Post key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
          </Post>
        ))}

        <Loader ref={loader} />
      </PostsContainer>
    </Page>
  )
}

export default App
