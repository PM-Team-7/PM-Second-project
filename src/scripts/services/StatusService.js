import HttpService from '@services/HttpService';
import User from '@models/User';

import { API_URL } from '@config';

export default class StatusService {
  static async getStatuses() {
    return HttpService.request({
      url: `${API_URL}/statuses`,
      headers: {
        ...User.getAuth(),
      },
    });
  }
}
