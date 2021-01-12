import request from '@/utils/request'

export function upload (data: any) {
  return request({
    method: 'POST',
    url: '/boss/course/upload',
    data
  })
}
