import HttpService from '@services/HttpService';
import User from '@models/User';

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

    User.token = response && response.jwt;
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

    User.token = response && response.jwt;
  }
}
