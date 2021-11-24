const DOMAIN = process.env.NEXT_PUBLIC_API
const REST_API_PATH = '/wp-json/wp/v2/'
const API_ROOT = DOMAIN + REST_API_PATH
const API_CUSTOM_ROOT = DOMAIN + '/wp-json/zone/v1/'

export const URI = {
  ALL_POSTS: API_ROOT + 'posts',
  POST: API_ROOT + 'post',
  CATEGORIES: API_ROOT + 'categories',
  PAGE: API_ROOT + 'pages',
  RELATED_POSTS: API_CUSTOM_ROOT + 'post/related/:id',
  TAGS: API_ROOT + 'tags',
}
