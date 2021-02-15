export interface RequestOption {
  method: 'GET' | 'POST' | 'PUT' | 'OPTION' | 'DELETE';
  body?: any;
  customConf?: any;
}

async function client(endpoint: string, json, options: RequestOption) {
  let headers;
  if (json) {
    headers = { 'Content-Type': 'application/json' };
  }

  const config = {
    method: options?.method ?? 'GET',
    ...options?.customConf,
    headers: {
      ...headers,
      ...options?.customConf.headers,
    },
  };

  if (options?.body) {
    if (json) {
      config.body = JSON.stringify(options?.body);
    } else {
      const formData = new FormData();
      for (const name in options?.body) {
        formData.append(name, options?.body[name]);
      }
      config.body = formData;
    }
  }

  let data;
  try {
    const response = await window.fetch(endpoint, config);
    data = await response.json();
    if (!response.ok) {
      throw new Error(data?.statusText ?? 'failed request to API');
    }

    return data;
  } catch (err) {
    return Promise.reject(err?.message || data);
  }
}

client.get = (endpoint: string, customConf: any = {}): Promise<any> => {
  return client(endpoint, true, { method: 'GET', ...customConf });
};

client.post = <T>(endpoint, body, json, customConf = {}): Promise<T> => {
  return client(endpoint, json, { method: 'POST', body, ...customConf });
};

client.put = (endpoint, body, json, customConf = {}): Promise<any> => {
  return client(endpoint, json, { method: 'PUT', body, ...customConf });
};

client.del = (endpoint, body, json, customConf = {}): Promise<any> => {
  return client(endpoint, json, { method: 'DELETE', body, ...customConf });
};

export { client };