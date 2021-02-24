import logger from '@components/Logger';

const handleErrors = async (response) => {
  if (response.ok) return response.json();

  const data = await response.json();
  data.message[0].messages.forEach((msg) => logger.show(msg.message));

  return null;
};
export default class HttpService {
  static async request({
    url,
    method = 'GET',
    body = null,
    headers = { 'Content-Type': 'application/json' },
  }) {
    const option = {
      method,
      headers,
      body: (method === 'GET' || method === 'DELETE') ? null : JSON.stringify(body),
    };

    return fetch(url, option).then(handleErrors);
  }
}
