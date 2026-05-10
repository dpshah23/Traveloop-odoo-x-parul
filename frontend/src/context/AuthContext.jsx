import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { fetchCurrentUser, loginRequest, refreshRequest, signupRequest } from '../api/auth.js'
import { AuthContext } from './authContext.js'
import { clearAuthStorage, getAuthSnapshot, setAuthStorage } from '../utils/authStorage.js'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [accessToken, setAccessToken] = useState(null)
  const [refreshToken, setRefreshToken] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function bootstrapAuth() {
      const snapshot = getAuthSnapshot()

      if (!snapshot.accessToken || !snapshot.refreshToken) {
        if (isMounted) {
          setIsLoading(false)
        }
        return
      }

      setAccessToken(snapshot.accessToken)
      setRefreshToken(snapshot.refreshToken)
      setUser(snapshot.user)

      try {
        const currentUser = await fetchCurrentUser()
        if (isMounted) {
          setUser(currentUser)
        }
      } catch {
        try {
          const refreshed = await refreshRequest(snapshot.refreshToken)
          setAuthStorage({
            accessToken: refreshed.access,
            refreshToken: snapshot.refreshToken,
            user: snapshot.user,
          })
          if (isMounted) {
            setAccessToken(refreshed.access)
            const currentUser = await fetchCurrentUser()
            setUser(currentUser)
          }
        } catch {
          clearAuthStorage()
          if (isMounted) {
            setUser(null)
            setAccessToken(null)
            setRefreshToken(null)
          }
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    bootstrapAuth()

    return () => {
      isMounted = false
    }
  }, [])

  const handleAuthSuccess = async (authResult) => {
    const nextAccessToken = authResult.access || authResult.accessToken || null
    const nextRefreshToken = authResult.refresh || authResult.refreshToken || null
    setAccessToken(nextAccessToken)
    setRefreshToken(nextRefreshToken)
    setAuthStorage({
      accessToken: nextAccessToken,
      refreshToken: nextRefreshToken,
    })

    const nextUser = authResult.user || (await fetchCurrentUser())
    setUser(nextUser)
    setAuthStorage({
      accessToken: nextAccessToken,
      refreshToken: nextRefreshToken,
      user: nextUser,
    })

    return nextUser
  }

  const login = async (credentials) => {
    const response = await loginRequest(credentials)
    return handleAuthSuccess(response)
  }

  const signup = async (payload) => {
    await signupRequest(payload)
    const loginResponse = await loginRequest({
      email: payload.email,
      password: payload.password,
    })

    return handleAuthSuccess(loginResponse)
  }

  const logout = () => {
    setUser(null)
    setAccessToken(null)
    setRefreshToken(null)
    clearAuthStorage()
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        refreshToken,
        isLoading,
        isAuthenticated: Boolean(accessToken && user),
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}