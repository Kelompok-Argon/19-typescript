import * as nats from 'nats';

let client;

export function connect(url?: string, config?: any): Promise<void> {
  return new Promise((resolve, reject) => {
    client = nats.connect(url, config);
    client.on('connect', () => {
      resolve();
    });
    client.on('error', (err) => {
      reject(err);
    });
  });
}

export function publish(subject: string, data) {
  client.publish(subject, JSON.stringify(data));
}

export function subscribe(subject: string, callback) {
  return client.subscribe(subject, callback);
}

export function unsubscribe(sid) {
  return client.unsubscribe(sid);
}

export function close() {
  if (!client) {
    return;
  }
  client.close();
}
