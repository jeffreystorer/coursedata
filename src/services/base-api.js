import axios from 'axios';
import appConfig from '@/ghin/config/index';
import { getUserToken, updateUrl } from '@/ghin/utils/api-helper';

export const SOURCE = 'GHINcom';
class BaseApi {
  baseUrl = appConfig.api.host;

  getBearerToken = (token = undefined) => {
    const userToken = token || getUserToken();
    if (userToken) {
      return `Bearer ${userToken}`;
    }
    return undefined;
  };

  getAuthHeader = (token = undefined) => ({
    headers: {
      Authorization: this.getBearerToken(token),
    },
  });

  appendSourceToUrl(url) {
    const excludeUrls = ['product_alerts.json', 'oauth/authorize'];
    if (excludeUrls.some((v) => url.includes(v))) {
      return url;
    }
    return updateUrl(url, 'source', SOURCE);
  }

  appendSourceToData = (data) => ({ ...data, source: SOURCE });

  httpGet(url, token = undefined) {
    return axios.get(this.appendSourceToUrl(url), this.getAuthHeader(token));
  }

  httpPost(url, data = null, token = undefined) {
    return axios.post(
      url,
      this.appendSourceToData(data),
      this.getAuthHeader(token)
    );
  }

  httpPatch(url, data = null) {
    return axios.patch(
      url,
      this.appendSourceToData(data),
      this.getAuthHeader()
    );
  }

  httpDelete(url, data = null, token = undefined) {
    const accessToken = this.getBearerToken(token);
    return axios.delete(url, {
      data: this.appendSourceToData(data),
      headers: {
        Authorization: accessToken,
      },
    });
  }
}

export default BaseApi;
