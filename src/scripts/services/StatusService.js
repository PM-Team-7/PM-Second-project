import logger from '@components/Logger';

import HttpService from '@services/HttpService';
import User from '@models/User';

import config from '@config';

const handleErrors = async (response) => {
  if (response.ok) return response.json();

  const { errors } = await response.json();
  for (const prop of errors) {
    logger.show(`${prop}: ${errors[prop]}`);
  }
  return null;
};

export default class StatusService {
  static async getStatuses() {
    return HttpService.request({
      url: `${config.API_URL}/statuses`,
      headers: {
        ...User.getAuth(),
      },
    }).then(handleErrors);
  }
}
