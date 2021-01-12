import request from '@/utils/request'

export function getResourcePages (data: object) {
  return request({
    method: 'POST',
    url: '/boss/resource/getResourcePages',
    data
  })
}

export function getCateGoryAll () {
  return request({
    method: 'GET',
    url: '/boss/resource/category/getAll'
  })
}

export function saveOrUpdateResource (data: any) {
  return request({
    method: 'POST',
    url: '/boss/resource/saveOrUpdate',
    data
  })
}

export function deleteResource (id: number) {
  return request({
    method: 'DELETE',
    url: `/boss/resource/${id}`
  })
}

export function getResource (id: number) {
  return request({
    method: 'GET',
    url: `/boss/resource/${id}`
  })
}

export const getAllResources = () => {
  return request({
    method: 'GET',
    url: '/boss/resource/getAll'
  })
}

export const allocateRoleResources = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/resource/allocateRoleResources',
    data
  })
}

export const getRoleResources = (roleId: string | number) => {
  return request({
    method: 'GET',
    url: '/boss/resource/getRoleResources',
    params: {
      roleId
    }
  })
}

export const getResourceCategories = () => {
  return request({
    method: 'GET',
    url: '/boss/resource/category/getAll'
  })
}
