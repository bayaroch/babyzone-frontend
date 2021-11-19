import axios from 'axios'

const api = axios.create({
  headers: { 'Content-Type': 'application/json' },
})

export const requestSource = function () {
  return axios.CancelToken.source()
}

export default api
