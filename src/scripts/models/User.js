export default class User {
  static set token(value) {
    return value && sessionStorage.setItem('auth', value);
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
