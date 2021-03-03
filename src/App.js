import React from 'react'

import { apiGetPosts } from './apis/postsAPI'

import Page from './components/Page'
import PostsContainer from './components/PostsContainer'
import Post from './components/Post'
import Loader from './components/Loader'
import VisibilitySensor from './components/VisibilitySensor'

function App() {
  const [posts, setPosts] = React.useState([])
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

  return (
    <Page>
      <PostsContainer>
        {posts.map((post) => (
          <Post key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
          </Post>
        ))}

        <VisibilitySensor onEnter={fetchMorePosts}>
          <Loader />
        </VisibilitySensor>
      </PostsContainer>
    </Page>
  )
}

export default App
