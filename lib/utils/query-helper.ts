import { AxiosRequestConfig, AxiosResponse } from "axios";
import {
  DELETE_API,
  GET_API,
  PATCH_API,
  POST_API,
  PUT_API,
} from "../api-helper";
import { createHttpError } from "./http-error";

const methods = {
  get: GET_API,
  post: POST_API,
  put: PUT_API,
  patch: PATCH_API,
  delete: DELETE_API,
};

type MethodsKeyType = keyof typeof methods;

type QueryHelperConfig<D, R> = {
  data?: D;
  method: MethodsKeyType;
  url: string;
  config?: AxiosRequestConfig & { skipAuth?: boolean };
};

/**
 * Executes an HTTP request using the specified method, URL, and configuration, and returns the response data.
 *
 * @template D - The type of the request data.
 * @template R - The type of the response data.
 * @param {QueryHelperConfig<D, R>} config - The configuration object for the request.
 * @param {string} config.url - The URL to send the request to.
 * @param {D} [config.data] - The data to be sent as the request body, if applicable.
 * @param {MethodsKeyType} config.method - The HTTP method to use for the request (e.g., 'get', 'post').
 * @param {AxiosRequestConfig & { skipAuth?: boolean }} [config.config] - Optional Axios request configuration, including the optional `skipAuth` flag to bypass authentication.
 * @returns {Promise<R>} - A promise that resolves to the response data of type R.
 * @throws {ApiError} - If the request fails, an ApiError is thrown, wrapping the original error details.
 */

export const queryHelper = async <D, R>({
  url,
  data,
  method,
  config,
}: QueryHelperConfig<D, R>): Promise<R> => {
  try {
    const response = await methods[method]<D, AxiosResponse<R, D>>(
      url,
      data,
      config,
    );
    return response.data;
  } catch (error) {
    return Promise.reject(createHttpError(error));
  }
};
