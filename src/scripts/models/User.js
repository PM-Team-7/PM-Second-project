export default class User {
  static setAuth(jwtToken) {
    sessionStorage.setItem('auth', jwtToken);
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
