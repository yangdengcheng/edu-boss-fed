import request from '@/utils/request'

interface CourseParams {
  currentPage: number;
  pageSize: number;
  courseName?: string;
  status?: string;
}

export function getQueryCourses (data: CourseParams) {
  return request({
    method: 'POST',
    url: '/boss/course/getQueryCourses',
    data
  })
}

export function changeCourseState (params: { courseId: number; status: string }) {
  return request({
    method: 'GET',
    url: '/boss/course/changeState',
    params
  })
}
