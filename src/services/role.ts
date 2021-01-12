import request from '@/utils/request'
import qs from 'qs'

interface Role {
  id?: number;
  code: string;
  name: string;
  description?: string;
}

export function getRoleAll () {
  return request({
    method: 'GET',
    url: '/boss/role/all'
  })
}

export function getRoleAllAndPermission (userId: number) {
  return request({
    method: 'GET',
    url: '/boss/role/getRolesWithUserPermission',
    params: { userId }
  })
}

export function getRolePages (data: object) {
  return request({
    method: 'POST',
    url: '/boss/role/getRolePages',
    data
  })
}

export function allocateRolesToUser (data: { userId: any; roleIdList: number[]}) {
  return request({
    method: 'POST',
    url: '/boss/role/allocateUserRoles',
    data
  })
}

export function saveOrUpdateRole (data: Role) {
  return request({
    method: 'POST',
    url: '/boss/role/saveOrUpdate',
    data
  })
}

export function deleteRole (id: number) {
  return request({
    method: 'DELETE',
    url: `/boss/role/${id}`
  })
}

export function getRole (id: number) {
  return request({
    method: 'GET',
    url: `/boss/role/${id}`
  })
}
export function getRolesByUser (userId: number) {
  return request({
    method: 'GET',
    url: `/boss/role/user/${userId}`
  })
}
