import logger from '@components/Logger';
import emitter from '@services/EventEmitter';

import HttpService from '@services/HttpService';
import User from '@models/User';

import { API_URL } from '@config';

const handleErrors = async (response) => {
  if (response.ok) return response.json();

  const { message } = await response.json();
  message[0].messages.forEach((msg) => logger.show(msg.message));

  return null;
};

export default class AuthService {
  static async Login({ identifier, password }) {
    const response = await HttpService.request({
      method: 'POST',
      url: `${API_URL}/auth/local`,
      body: {
        identifier,
        password,
      },
    }).then(handleErrors);

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
    }).then(handleErrors);

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
