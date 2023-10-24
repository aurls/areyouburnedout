import { Value } from '../types';

interface PredictionResponse {
  status: 'success' | 'error',
  prediction?: number
}

const API_BASE = 'api/v1';

const send = async <T = unknown>(uri: string, data: any = null, options: RequestInit = {}): Promise<T> => {
  const response = await fetch(
    `${API_BASE}/${uri}`,
    {
      ...options,
      body: data && JSON.stringify(data)
    }
  );

  if (response.status !== 200) {
    throw new Error(`Could not fetch ${uri}, received ${response.status}`);
  }

  return response.json();
};

const get = async <T = unknown>(uri: string): Promise<T> => {
  return send<T>(uri);
};

const post = async <T = unknown>(uri: string, data: any): Promise<T> => {
  const options: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return send<T>(uri, data, options);
};

const postParams = async (value: Value): Promise<number> => {
  const response = await post<PredictionResponse>('attrition', { params: value });

  if (response?.status !== 'success') {
    throw new Error('Could not get prediction. Server returned 200, but the model error had occured');
  }

  return response.prediction!;
};

export default {
  get,
  post,
  postParams
};
