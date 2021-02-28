import styled from 'styled-components'

const Post = styled.article`
  padding: 24px;

  & > p {
    color: #333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  border-bottom: 1px solid #ccc;
`

export default Post
