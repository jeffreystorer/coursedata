import { get } from '@/utils/localStorage';
import CourseApi from '@/services/course-api';

export default function buildCourseRequests() {
  const token = get('token');
  const course_ids = [8946, 8945, 9091, 9146, 9147, 9090];
  let requests = [];
  course_ids.forEach(buildRequests);

  function buildRequests(item) {
    const course_id = item;
    requests = [...requests, CourseApi.getCourseData(course_id, token)];
  }
  return requests;
}
