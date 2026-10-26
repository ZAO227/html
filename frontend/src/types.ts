export interface UserInfo {
  id: number
  username: string
  displayName: string
  department: string
}

export interface MaterialItem {
  id: number
  name: string
  projectName: string
  department: string
  category: string
  requirement?: string
  status: 'PENDING' | 'UPLOADED' | string
  library: boolean
  fileUrl?: string
}

export interface HomeStats {
  totalPending: number
  businessPending: number
  financePending: number
  hrPending: number
}

export interface PageResult<T> {
  total: number
  page: number
  pageSize: number
  list: T[]
}

export interface ApiResponse<T> {
  code: number
  message: string
  data: T
}
