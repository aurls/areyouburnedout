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
    throw new Error(`Could not fetch ${uri}, received ${response.status}`);
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
  throw new Error('Could not get prediction. Server returned 200, but model error had occured');
};

const getAttrition = async (id: string): Promise<Prediction> => {
  const response = await get<Response<Prediction>>(`attrition/${id}`);

  if (response?.status !== 'success') {
    throwPredictionError();
  }

  return response.payload as Prediction;
};

const postParams = async (params: Params): Promise<Prediction> => {
  const response = await post<Response<Prediction>>('attrition', { params });

  if (response?.status !== 'success') {
    throwPredictionError();
  }

  return response.payload as Prediction;
};

export default {
  get,
  post,
  getAttrition,
  postParams
};
