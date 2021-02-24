import '@styles/Auth.scss';

import User from '@models/User';
import AuthService from '@services/AuthService';
import emitter from '@services/EventEmitter';

class Auth {
  constructor() {
    this.authorization = document.getElementById('authorization');

    this.signinForm = document.getElementById('sign-in');
    this.signinUsername = document.getElementById('sign-in__username');
    this.signinPassword = document.getElementById('sign-in__password');

    this.signupForm = document.getElementById('sign-up');
    this.signupUsername = document.getElementById('sign-up__username');
    this.signupEmail = document.getElementById('sign-up__email');
    this.signupPassword = document.getElementById('sign-up__password');

    this.toSignIn = document.getElementById('to-sign-in');
    this.toSignUp = document.getElementById('to-sign-up');

    this.render = this.render.bind(this);
    this.registerListener = this.registerListener.bind(this);

    this.showAuth = this.showAuth.bind(this);
    this.hideAuth = this.hideAuth.bind(this);

    this.signInFormSubmit = this.signInFormSubmit.bind(this);
    this.signUpFormSubmit = this.signUpFormSubmit.bind(this);

    this.changeToSignIn = this.changeToSignIn.bind(this);
    this.changeToSignUp = this.changeToSignUp.bind(this);

    this.registerListener();
  }

  render() {
    if (User.token) {
      this.hideAuth();
      emitter.emit('dashboard');
    } else {
      this.showAuth();
    }
  }

  showAuth() {
    this.authorization.classList.remove('hide');
  }

  hideAuth() {
    this.authorization.classList.add('hide');
  }

  signInFormSubmit(e) {
    e.preventDefault();

    AuthService.Login({
      identifier: this.signinUsername.value,
      password: this.signinPassword.value,
    });
  }

  signUpFormSubmit(e) {
    e.preventDefault();

    AuthService.Registration({
      username: this.signupUsername.value,
      email: this.signupEmail.value,
      password: this.signupPassword.value,
    });
  }

  changeToSignIn() {
    this.signupForm.classList.add('hide');
    this.signinForm.classList.remove('hide');
  }

  changeToSignUp() {
    this.signinForm.classList.add('hide');
    this.signupForm.classList.remove('hide');
  }

  registerListener() {
    this.signinForm.addEventListener('submit', this.signInFormSubmit);
    this.signupForm.addEventListener('submit', this.signUpFormSubmit);

    this.toSignIn.addEventListener('click', this.changeToSignIn);
    this.toSignUp.addEventListener('click', this.changeToSignUp);
  }
}

export default new Auth();
