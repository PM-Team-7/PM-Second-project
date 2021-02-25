import logger from '@components/Logger';

import HttpService from '@services/HttpService';
import User from '@models/User';

import { API_URL } from '@config';

const handleErrors = async (response) => {
  if (response.ok) return response.json();

  const { errors } = await response.json();
  for (const prop of errors) {
    logger.show(`${prop}: ${errors[prop]}`);
  }
  return null;
};

export default class CardService {
  static async getCards() {
    return HttpService.request({
      url: `${API_URL}/cards`,
      headers: {
        ...User.getAuth(),
      },
    }).then(handleErrors);
  }

  static async getCardById(id) {
    return HttpService.request({
      url: `${API_URL}/cards/${id}`,
      headers: {
        ...User.getAuth(),
      },
    }).then(handleErrors);
  }

  static async postCard(data) {
    return HttpService.request({
      method: 'POST',
      url: `${API_URL}/cards`,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        ...User.getAuth(),
      },
      body: data,
    }).then(handleErrors);
  }

  static async putCard(id, data) {
    return HttpService.request({
      method: 'PUT',
      url: `${API_URL}/cards/${id}`,
      headers: {
        'Content-Type': 'application/json',
        ...User.getAuth(),
      },
      body: data,
    }).then(handleErrors);
  }

  static async deleteCard(id) {
    return HttpService.request({
      method: 'DELETE',
      url: `${API_URL}/cards/${id}`,
      headers: {
        ...User.getAuth(),
      },
    }).then(handleErrors);
  }
}
