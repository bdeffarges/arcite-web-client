import moment from 'moment';

function getMomentFromApi(apiDate) {
  if (!apiDate) {
    return null;
  }
  const m = moment(apiDate, 'YYYY/MM/DD-HH:mm:ss');
  return m.isValid() ? m : null;
}

function formatNice(m) {
  if (!m) {
    return '';
  }
  return m.fromNow();
}

function now() {
  return moment();
}

export {
  getMomentFromApi,
  formatNice,
  now,
};
