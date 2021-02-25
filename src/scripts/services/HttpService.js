export default class HttpService {
  static async request({
    url,
    method = 'GET',
    body = null,
    headers = { 'Content-Type': 'application/json; charset=utf-8' },
  }) {
    const option = {
      method,
      headers,
      body: (method === 'GET' || method === 'DELETE') ? null : JSON.stringify(body),
    };

    return fetch(url, option);
  }
}
