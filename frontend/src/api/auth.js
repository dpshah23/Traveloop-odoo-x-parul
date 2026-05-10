import apiClient from './client'

const AUTH_PREFIX = '/api/auth'

async function requestWithFallback(primaryPath, fallbackPath, payload) {
  try {
    const response = await apiClient.post(primaryPath, payload)
    return response.data
  } catch (error) {
    if (error?.response?.status === 404 && fallbackPath) {
      const fallbackResponse = await apiClient.post(fallbackPath, payload)
      return fallbackResponse.data
    }

    throw error
  }
}

export async function loginRequest(credentials) {
  const response = await apiClient.post(`${AUTH_PREFIX}/login/`, credentials)
  return response.data
}

export async function signupRequest(payload) {
  return requestWithFallback(
    `${AUTH_PREFIX}/register/register/`,
    `${AUTH_PREFIX}/register/`,
    payload,
  )
}

export async function refreshRequest(refresh) {
  const response = await apiClient.post(`${AUTH_PREFIX}/token/refresh/`, {
    refresh,
  })

  return response.data
}

export async function fetchCurrentUser() {
  const response = await apiClient.get('/api/users/me/')
  return response.data
}