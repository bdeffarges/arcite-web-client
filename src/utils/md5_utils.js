import md5 from 'blueimp-md5';

export function getMD5(arg) {
  if (Array.isArray(arg)) {
    return md5(arg.join(';'));
  }
  return md5(arg);
}

export default {
  getMD5,
};
