import type { Params } from '../types';

interface Prediction {
  id: string
  timestamp: number
  params: Params
  prediction: number
}

interface Response<T = any> {
  status: 'success' | 'error'
  payload?: T
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
    throw new Error(`Failed to fetch ${uri}, received ${response.status}`);
  }

  return await response.json();
};

const get = async <T = unknown>(uri: string): Promise<T> => {
  return await send<T>(uri);
};

const post = async <T = unknown>(uri: string, data: any): Promise<T> => {
  const options: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return await send<T>(uri, data, options);
};

const throwPredictionError = (): Error => {
  throw new Error('Failed to get prediction. Server returned 200, but model error had occured');
};

const getAttrition = async (id: string): Promise<Prediction> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const random = Math.random();

      if (random > .33) {
        resolve({
          id: 'someid',
          prediction: random,
          params: {}
        })
      } else {
        reject();
      }
    }, 3000);
  });

  // const response = await get<Response<Prediction>>(`attrition/${id}`);

  // if (response?.status !== 'success') {
  //   throwPredictionError();
  // }

  // return response.payload as Prediction;
};

const postParams = async (params: Params): Promise<Prediction> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const random = Math.random();

      if (random > .33) {
        resolve({
          id: 'someid',
          prediction: random,
          params: {}
        })
      } else {
        reject();
      }
    }, 3000);
  });

  // const response = await post<Response<Prediction>>('attrition', { id, params });

  // if (response?.status !== 'success') {
  //   throwPredictionError();
  // }

  // return response.payload as Prediction;
};

export default {
  get,
  post,
  postParams
};
