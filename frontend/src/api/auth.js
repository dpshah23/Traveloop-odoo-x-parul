import apiClient from './client'

const AUTH_PREFIX = '/api/auth'

export async function loginRequest(credentials) {
  const response = await apiClient.post(`${AUTH_PREFIX}/login/`, credentials)
  return response.data
}

export async function signupRequest(payload) {
  const response = await apiClient.post(`${AUTH_PREFIX}/register/register/`, payload)
  return response.data
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