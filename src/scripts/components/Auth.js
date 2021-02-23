import User from '@models/User';
import AuthService from '@services/AuthService';

class Auth {
  constructor() {
    this.authorization = document.getElementById('authorization');

    this.signinForm = document.getElementById('sign-in__form');
    this.signinUsername = document.getElementById('sign-in__username');
    this.signinPassword = document.getElementById('sign-in__password');

    this.signupForm = document.getElementById('sign-up__form');

    this.render = this.render.bind(this);
    this.registerListener = this.registerListener.bind(this);
    this.signinFormSubmit = this.signinFormSubmit.bind(this);

    this.registerListener();
  }

  render() {
    if (User.token) {
      this.authorization.classList.add('hide');
    } else {
      this.authorization.classList.remove('hide');
    }
  }

  signinFormSubmit(e) {
    e.preventDefault();
    AuthService.Login({
      identifier: this.signinUsername.value,
      password: this.signinPassword.value,
    });
  }

  registerListener() {
    this.signinForm.addEventListener('submit', this.signinFormSubmit);
  }
}

export default new Auth();
