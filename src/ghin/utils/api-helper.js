import moment from 'moment';
import { defaultPagination } from '@/ghin/variables/pagination';
import { SOURCE } from '@/services/base-api';
import { encryptWithPublicKey } from '@/ghin/utils/encoder';

export const golferCredentials = () => {
  return {
    golfer_id: '585871',
    last_name: 'Storer',
  };
};

export const getGolferId = golferCredentials.golfer_id;

export const getUserToken = () => '';

export const golferGender = (gender) => ({
  gender: 'M',
});

export const active = {
  activeOnly: true,
};

export const statusActive = {
  status: 'Active',
};

export const perPage = {
  per_page: defaultPagination.PER_PAGE,
};

export const fromGhin = {
  from_ghin: true,
};

export const updateUrl = (url, key, value) => {
  if (value !== undefined) {
    value = encodeURI(value);
  }
  var hashIndex = url.indexOf('#') | 0;
  if (hashIndex === -1) hashIndex = url.length | 0;
  var urls = url.substring(0, hashIndex).split('?');
  var baseUrl = urls[0];
  var parameters = '';
  var outPara = {};
  if (urls.length > 1) {
    parameters = urls[1];
  }
  if (parameters !== '') {
    parameters = parameters.split('&');
    // eslint-disable-next-line
    for (k in parameters) {
      // eslint-disable-next-line
      var keyVal = parameters[k];
      keyVal = keyVal.split('=');
      var eKey = keyVal[0];
      var eValue = '';
      if (keyVal.length > 1) {
        eValue = keyVal[1];
      }
      outPara[eKey] = eValue;
    }
  }

  if (value !== undefined) {
    outPara[key] = value;
  } else {
    delete outPara[key];
  }
  parameters = [];
  for (var k in outPara) {
    parameters.push(k + '=' + outPara[k]);
  }

  var finalUrl = baseUrl;

  if (parameters.length > 0) {
    finalUrl += '?' + parameters.join('&');
  }

  return finalUrl + url.substring(hashIndex);
};

export const getUserLoginToken = () => {
  const data = {
    source: SOURCE,
    datetime: moment().toISOString(),
  };
  return encryptWithPublicKey(JSON.stringify(data));
};
