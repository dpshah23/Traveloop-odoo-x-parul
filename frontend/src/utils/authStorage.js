const accessTokenKey = 'traveloop_access_token'
const refreshTokenKey = 'traveloop_refresh_token'
const userKey = 'traveloop_user'

export function getStoredAccessToken() {
  return localStorage.getItem(accessTokenKey)
}

export function getStoredRefreshToken() {
  return localStorage.getItem(refreshTokenKey)
}

export function getStoredUser() {
  const rawUser = localStorage.getItem(userKey)
  return rawUser ? JSON.parse(rawUser) : null
}

export function setAuthStorage({ accessToken, refreshToken, user }) {
  if (accessToken) {
    localStorage.setItem(accessTokenKey, accessToken)
  }

  if (refreshToken) {
    localStorage.setItem(refreshTokenKey, refreshToken)
  }

  if (user) {
    localStorage.setItem(userKey, JSON.stringify(user))
  }
}

export function clearAuthStorage() {
  localStorage.removeItem(accessTokenKey)
  localStorage.removeItem(refreshTokenKey)
  localStorage.removeItem(userKey)
}

export function getAuthSnapshot() {
  return {
    accessToken: getStoredAccessToken(),
    refreshToken: getStoredRefreshToken(),
    user: getStoredUser(),
  }
}