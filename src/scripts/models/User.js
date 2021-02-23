export default class User {
  static set token(value) {
    if (value) {
      sessionStorage.setItem('auth', value);
    } else {
      sessionStorage.removeItem('auth');
    }
  }

  static get token() {
    return sessionStorage.getItem('auth');
  }

  static getAuth() {
    const jwtToken = sessionStorage.getItem('auth');
    return {
      ...(jwtToken && {
        Authorization: `Bearer ${jwtToken}`,
      }),
    };
  }
}
