import User from '../model/user';

// -----------------------------------------------------------------------------
// AUTHENTICATION
// -----------------------------------------------------------------------------

export function authUser(credentials) {
  const { username, password } = credentials;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (password === '1234') {
        const user = new User();
        user.fromApi({
          username,
          organization: 'com.idorsia.research',
        });
        resolve({
          data: user,
        });
      } else {
        const error = new Error();
        error.response = {
          status: 403,
          data: {
            error: 'Login failed',
          },
        };
        reject(error);
      }
    }, 4000);
  });
  return promise;
}

export function unauthUser() {
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 4000);
  });
  return promise;
}
