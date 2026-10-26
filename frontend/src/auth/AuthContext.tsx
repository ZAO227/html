import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import * as api from '../api'
import type { UserInfo } from '../types'

interface AuthState {
  token: string | null
  user: UserInfo | null
  login: (username: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthState | null>(null)

function readStoredUser(): UserInfo | null {
  const raw = localStorage.getItem('bid_user')
  if (!raw) return null
  try {
    return JSON.parse(raw) as UserInfo
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('bid_token'))
  const [user, setUser] = useState<UserInfo | null>(() => readStoredUser())

  const login = useCallback(async (username: string, password: string) => {
    const result = await api.login(username, password)
    localStorage.setItem('bid_token', result.token)
    localStorage.setItem('bid_user', JSON.stringify(result.user))
    setToken(result.token)
    setUser(result.user)
  }, [])

  const logout = useCallback(async () => {
    try {
      await api.logout()
    } catch {
      // ignore
    }
    localStorage.removeItem('bid_token')
    localStorage.removeItem('bid_user')
    setToken(null)
    setUser(null)
  }, [])

  const value = useMemo(() => ({ token, user, login, logout }), [token, user, login, logout])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return ctx
}
