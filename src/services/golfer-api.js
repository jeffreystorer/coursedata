import { objToQuerystring } from '@/ghin/utils/querystring-helper';
import {
  statusActive,
  perPage,
  fromGhin,
  getUserLoginToken,
} from '@/ghin/utils/api-helper';
import BaseApi from '@/services/base-api';

class GolferApi extends BaseApi {
    login = (t, r, n=!1, o=null, i=!0, a=!1) => {
      const s = {
        user: {
          password: t,
          email_or_ghin: r,
          remember_me: n
        },
        token: getUserLoginToken(), //wVe(),
        turnstile_token: o,
        validate_turnstile: i
      };
      return a && (s.skip_turnstile = !0),
      this.httpPost(`${this.baseUrl}/api/v1/golfer_login.json`, s)
    }


    findGolfer = (t, token, r=1) => {
      const n = `${this.baseUrl}/api/v1/golfers.json`
        , o = {
        ...statusActive,
        ...fromGhin,
        ...perPage,
        page: r,
        golfer_id: t,
        includeLowHandicapIndex: !0
      };
      return this.httpGet(`${n}?${objToQuerystring(o)}`, token);
    }

  searchGolfer = (golfer_id) => {
    const url = `${this.baseUrl}/api/v1/search_golfer.json`;
    return this.httpGet(`${url}?${objToQuerystring({ golfer_id })}`);
  };
}
export default new GolferApi();
