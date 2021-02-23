import HttpService from '@services/HttpService';
import User from '@models/User';

import { API_URL } from '@config';

export default class CardService {
  static async getCards() {
    return HttpService.request({
      url: `${API_URL}/cards`,
      headers: {
        ...User.getAuth(),
      },
    });
  }

  static async getCardById(id) {
    return HttpService.request({
      url: `${API_URL}/cards/${id}`,
      headers: {
        ...User.getAuth(),
      },
    });
  }

  static async postCard(data) {
    return HttpService.request({
      method: 'POST',
      url: `${API_URL}/cards`,
      headers: {
        ...User.getAuth(),
      },
      body: data,
    });
  }

  static async putCard(id, data) {
    return HttpService.request({
      method: 'PUT',
      url: `${API_URL}/cards/${id}`,
      headers: {
        ...User.getAuth(),
      },
      body: data,
    });
  }

  static async deleteCard(id) {
    return HttpService.request({
      method: 'DELETE',
      url: `${API_URL}/cards/${id}`,
      headers: {
        ...User.getAuth(),
      },
    });
  }
}
