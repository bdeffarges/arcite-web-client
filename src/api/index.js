import * as authProd from './api-auth';
import * as experimentsProd from './api-experiments';
import * as experimentsDev from './api-experiments-dev';
import * as transformsProd from './api-transforms';
import * as transformsDev from './api-transforms-dev';
import * as organizationProd from './api-organization';
import * as artifactsProd from './api-artifacts';


const authDev = authProd;
export const isDevelopment = false;

export const auth = isDevelopment ? authDev : authProd;
export const experiments = isDevelopment ? experimentsDev : experimentsProd;
export const transforms = isDevelopment ? transformsDev : transformsProd;
export const organization = isDevelopment ? organizationProd : organizationProd;
export const artifacts = artifactsProd;

export default {
  auth,
  experiments,
  transforms,
  organization,
  artifacts,
};
