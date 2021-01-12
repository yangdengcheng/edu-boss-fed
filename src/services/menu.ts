import request from '@/utils/request'

export function getMenuAll () {
  return request({
    method: 'GET',
    url: '/boss/menu/getAll'
  })
}

export function deleteMenu (id: number) {
  return request({
    method: 'DELETE',
    url: `/boss/menu/${id}`
  })
}

export function getMenu (id: number) {
  return request({
    method: 'GET',
    url: `/boss/menu/${id}`
  })
}

// eslint-disable-next-line
export function getEditMenuInfo (id: any) {
  return request({
    method: 'GET',
    url: '/boss/menu/getEditMenuInfo',
    params: { id }
  })
}

// eslint-disable-next-line
export function saveOrUpdateMenu (data: any) {
  return request({
    method: 'POST',
    url: '/boss/menu/saveOrUpdate',
    data
  })
}

export function allocateRoleMenus (data: { roleId: number; menuIdList: number[]}) {
  return request({
    method: 'POST',
    url: '/boss/menu/allocateRoleMenus',
    data
  })
}

export function getMenuNodeList () {
  return request({
    method: 'GET',
    url: '/boss/menu/getMenuNodeList'
  })
}

export function getRoleMenus (roleId: number) {
  return request({
    method: 'GET',
    url: '/boss/menu/getRoleMenus',
    params: { roleId }
  })
}
