import axios from 'axios'

const PROXY_URL = 'https://eason-proxy.herokuapp.com/'
const DCARD_API_URL = 'https://www.dcard.tw/v2/'

const dcardRequest = axios.create({
  baseURL: PROXY_URL + DCARD_API_URL
})

export const apiGetPosts = (beforePostId) =>
  dcardRequest.get('/posts', {
    params: {
      popular: true,
      before: beforePostId
    }
  })
