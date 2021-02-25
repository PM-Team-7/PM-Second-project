import User from '@models/User';
import emitter from '@services/EventEmitter';
import HttpService from '@services/HttpService';

import { API_URL } from '@config';

export default class AuthService {
  static async Login({ identifier, password }) {
    const response = await HttpService.request({
      method: 'POST',
      url: `${API_URL}/auth/local`,
      body: {
        identifier,
        password,
      },
    });

    this.setToken(response);
  }

  static async Registration({ username, email, password }) {
    const response = await HttpService.request({
      method: 'POST',
      url: `${API_URL}/auth/local/register`,
      body: {
        username,
        email,
        password,
      },
    });

    this.setToken(response);
  }

  static setToken(response) {
    if (response) {
      User.token = response.jwt;

      emitter.emit('authorized');
      emitter.emit('dashboard');
    }
  }
}
