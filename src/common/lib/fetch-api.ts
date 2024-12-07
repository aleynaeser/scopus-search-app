'use server';

import { SCConfig } from '@common/config';

type TConfigResult = IApiConfig & { headers: { [key: string]: string } };

export interface IApiConfig {
  method?: 'GET';
  body?: BodyInit | null;
  mode?: RequestMode;
  credentials?: RequestCredentials;
  cache?: RequestCache;
  redirect?: RequestRedirect;
  referrer?: string;
  referrerPolicy?: ReferrerPolicy;
  path?: string;
  params?: Record<string, any>;
  headers?: { [key: string]: string };
}

export const createConfig = async (config: IApiConfig) => {
  // const baseURL = process.env.NEXT_PUBLIC_SERVICE_URI + '/';
  const baseURL = 'https://api.elsevier.com/content/search/scopus' + '/';
  const path = config.path ? baseURL + config.path : baseURL;

  const headers: { [key: string]: string } = {
    'Content-Type': 'application/json',
    'X-ELS-APIKey': SCConfig.apiKey,
    ...config.headers,
  };

  const manipulatedConfig: TConfigResult = {
    credentials: 'include',
    headers: headers,
    method: 'GET',
    redirect: 'follow',
    ...config,
  };

  return { path, manipulatedConfig };
};

export async function baseFetch<T = any>(url: string, config: IApiConfig): Promise<TServiceListResponse<T>> {
  const { path, manipulatedConfig } = await createConfig(config);
  const manipulatedUrl = url?.[0] === '/' || url === '' ? url : '/' + url;
  const completeURL = new URL(path + manipulatedUrl);

  if (config.params) {
    Object.keys(config.params).forEach((key) => completeURL.searchParams.append(key, config.params![key]));
  }

  try {
    const response = await fetch(completeURL, manipulatedConfig);
    if (!response.ok) throw response;

    return response.json();
  } catch (error: any) {
    if (error) {
      const errorJSON = (await error.json?.()) ?? undefined;
      const errorString = JSON.stringify({ status: error.status, ...(errorJSON ?? error) });

      throw new Error(errorString);
    }

    throw new Error(error);
  }
}

export const get = async <T>(url: string, config?: IApiConfig) => {
  const response = await baseFetch<T>(url, { ...config, method: 'GET' });
  return response;
};
