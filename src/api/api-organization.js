import axios from 'axios';

import { getUrl } from './api-utilities';
import Organization from '../model/organization';

export function loadOrganization() {
  const promise = new Promise((resolve, reject) => {
    axios.get(getUrl('/organization'))
    .then((res) => {
      const { data: organization } = res;
      const data = new Organization();
      data.fromApi(organization);
      resolve({
        data,
      });
    })
    .catch(error => reject(error));
  });

  return promise;
}

export default {
  loadOrganization,
};
