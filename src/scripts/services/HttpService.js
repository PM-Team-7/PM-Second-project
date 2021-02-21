const handleErrors = (response) => !response.ok ? null : response;

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
