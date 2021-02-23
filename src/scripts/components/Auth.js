import User from '@models/User';

class Auth {
  constructor() {
    this.authorization = document.getElementById('authorization');
    this.signinForm = document.getElementById('sign-in');
    this.signupForm = document.getElementById('sign-up');

    this.render = this.render.bind(this);
  }

  render() {
    if (User.token) {
      this.authorization.classList.add('hide');
    } else {
      this.authorization.classList.remove('hide');
    }
  }
}
