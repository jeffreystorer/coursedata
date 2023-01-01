import { objToQuerystring } from '@/ghin/utils/querystring-helper';
import {
  statusActive,
  perPage,
  fromGhin,
  getUserLoginToken,
} from '@/ghin/utils/api-helper';
import BaseApi from '@/services/base-api';

class GolferApi extends BaseApi {
  login = (password, email_or_ghin, remember_me = false) => {
    const params = {
      user: {
        password,
        email_or_ghin,
        remember_me,
      },
      token: getUserLoginToken(),
    };

    return this.httpPost(`${this.baseUrl}/api/v1/golfer_login.json`, params);
  };

  findGolfer = (golfer_id, token, page = 1) => {
    const url = `${this.baseUrl}/api/v1/golfers.json`;
    const params = {
      ...statusActive,
      ...fromGhin,
      ...perPage,
      page,
      golfer_id,
      includeLowHandicapIndex: true,
    };
    return this.httpGet(`${url}?${objToQuerystring(params)}`, token);
  };

  searchGolfer = (golfer_id) => {
    const url = `${this.baseUrl}/api/v1/search_golfer.json`;
    return this.httpGet(`${url}?${objToQuerystring({ golfer_id })}`);
  };
}
export default new GolferApi();
