import axios from 'axios'
import {
  clearAuthStorage,
  getStoredAccessToken,
  getStoredRefreshToken,
  setAuthStorage,
} from '../utils/authStorage.js'

let isRefreshing = false
let pendingRequests = []

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'https://traveloop-odoo-x-parul.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  const token = getStoredAccessToken()

  if (token) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

function resolvePendingRequests(error, token = null) {
  pendingRequests.forEach((promise) => {
    if (error) {
      promise.reject(error)
    } else {
      promise.resolve(token)
    }
  })

  pendingRequests = []
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error?.response?.status !== 401 || originalRequest?._retry) {
      return Promise.reject(error)
    }

    const refreshToken = getStoredRefreshToken()

    if (!refreshToken) {
      clearAuthStorage()
      return Promise.reject(error)
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingRequests.push({ resolve, reject })
      }).then((token) => {
        originalRequest.headers.Authorization = `Bearer ${token}`
        return apiClient(originalRequest)
      })
    }

    originalRequest._retry = true
    isRefreshing = true

    try {
      const refreshResponse = await axios.post(`${apiClient.defaults.baseURL}/api/auth/token/refresh/`, {
        refresh: refreshToken,
      })

      const nextAccessToken = refreshResponse.data.access
      setAuthStorage({ accessToken: nextAccessToken, refreshToken })
      resolvePendingRequests(null, nextAccessToken)

      originalRequest.headers.Authorization = `Bearer ${nextAccessToken}`
      return apiClient(originalRequest)
    } catch (refreshError) {
      resolvePendingRequests(refreshError, null)
      clearAuthStorage()
      return Promise.reject(refreshError)
    } finally {
      isRefreshing = false
    }
  },
)

export default apiClient