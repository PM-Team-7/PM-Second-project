export default class User {
  static get token() {
    return window.localStorage.getItem('token');
  }

  static set token(value) {
    return window.localStorage.setItem('token', value);
  }
}
