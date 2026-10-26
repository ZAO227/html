import client, { request } from './client'
import type { HomeStats, MaterialItem, PageResult, UserInfo } from '../types'

export function login(username: string, password: string) {
  return request<{ token: string; user: UserInfo }>(
    client.post('/auth/login', { username, password }),
  )
}

export function fetchMe() {
  return request<UserInfo>(client.get('/auth/me'))
}

export function logout() {
  return request<null>(client.post('/auth/logout'))
}

export function fetchHomeStats() {
  return request<HomeStats>(client.get('/home/stats'))
}

export function fetchMaterials(params: {
  keyword?: string
  department?: string
  status?: string
  libraryOnly?: boolean
  page?: number
  pageSize?: number
}) {
  return request<PageResult<MaterialItem>>(client.get('/materials', { params }))
}

export function uploadMaterial(id: number) {
  return request<MaterialItem>(client.post(`/materials/${id}/upload`))
}

export function fetchMaterial(id: number) {
  return request<MaterialItem>(client.get(`/materials/${id}`))
}
