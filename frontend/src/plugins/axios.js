import axios from 'axios'
import { getToken } from '../services/JwtService'
import { history } from '../helpers/history'

const axiosIns = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    Accept: 'application/json',
  },
})

// ℹ️ Add request interceptor to send the authorization header on each subsequent request after login
axiosIns.interceptors.request.use((config) => {
  const token = getToken()

  if (token) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

// ℹ️ Add response interceptor to handle 401 response
axiosIns.interceptors.response.use(
  (response) => {
    if (response?.status === 401 || response?.data?.status === 401) {
      destroyUserSession()
    }

    return Promise.resolve(response)
  },
  (error) => {
    if (
      error.response?.status === 401 ||
      error.response?.data?.status === 401
    ) {
      destroyUserSession()
    }

    return Promise.reject(error)
  }
)

const destroyUserSession = () => {
  history.navigate('signin')
}

export default axiosIns
