import { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext(null)

const storageKey = 'traveloop_auth_user'
const tokenKey = 'traveloop_access_token'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem(storageKey)
    return savedUser ? JSON.parse(savedUser) : null
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem(storageKey, JSON.stringify(user))
    } else {
      localStorage.removeItem(storageKey)
    }
  }, [user])

  const login = (nextUser, accessToken = 'demo-access-token') => {
    setUser(nextUser)
    localStorage.setItem(tokenKey, accessToken)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(tokenKey)
    localStorage.removeItem(storageKey)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}