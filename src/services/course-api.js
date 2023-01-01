import { objToQuerystring } from '@/ghin/utils/querystring-helper';
import { getUserLoginToken } from '@/ghin/utils/api-helper';
import { BaseApi } from '@/services';

class CourseApi extends BaseApi {
  getCourseData = (course_id, token) => {
    const url = `https://api.ghin.com/api/v1/courses/${course_id}/tee_set_ratings.json?number_of_holes=18&tee_set_status=Active`;
    const params = {};
    return this.httpGet(`${url}`, token);
  };
}
export default new CourseApi();
