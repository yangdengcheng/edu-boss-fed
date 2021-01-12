import request from '@/utils/request'
import qs from 'qs'

interface User {
  phone: string;
  password: string;
}

interface UserParams {
  currentPage: number;
  pageSize: number;
  phone?: string;
  userId?: number;
  startCreateTime?: number;
  endCreateTime?: number;
}

export function login (data: User) {
  return request({
    method: 'POST',
    url: '/front/user/login',
    data: qs.stringify(data)
  })
}

// 获取菜单列表和资源列表权限
export function getUserPermissions () {
  return request({
    method: 'GET',
    url: '/boss/permission/getUserPermissions'
  })
}

export function getInfo () {
  return request({
    method: 'GET',
    url: '/front/user/getInfo'
  })
}

export function refreshToken (params: { refreshtoken: string }) {
  return request({
    method: 'GET',
    url: '/front/user/refresh_token',
    params
  })
}

export function getUserPages (data: UserParams) {
  return request({
    method: 'POST',
    url: '/boss/user/getUserPages',
    data
  })
}
