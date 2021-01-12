import request from '@/utils/request'

interface Space {
  id?: number;
  code: string;
  name: string;
  description?: string;
}

export function getAllSpaces () {
  return request({
    method: 'GET',
    url: '/front/ad/space/getAllSpaces'
  })
}

export function getSpacesById (id: number | string) {
  return request({
    method: 'GET',
    url: '/front/ad/space/getSpaceById',
    params: { id }
  })
}

export function saveOrUpdateSpace (data: any) {
  return request({
    method: 'POST',
    url: '/front/ad/space/saveOrUpdate',
    data
  })
}

export function getAdList () {
  return request({
    method: 'GET',
    url: '/front/ad/getAdList'
  })
}

export function getAdInfo (id: string) {
  return request({
    method: 'GET',
    url: '/front/ad/getAdById',
    params: { id }
  })
}

export function saveOrUpdateAd (data: any) {
  return request({
    method: 'POST',
    url: '/front/ad/saveOrUpdate',
    data
  })
}

export function updateAdStatus (params: { id: number; status: number }) {
  return request({
    method: 'GET',
    url: '/front/ad/updateStatus',
    params
  })
}
