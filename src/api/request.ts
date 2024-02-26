import axios, { AxiosRequestConfig, AxiosError } from "axios";

/**
 * Performs an API request.
 * @param options The request options.
 * @param authToken The optional authentication token.
 */
export async function request<Response, Request>(
  path: string,
  requestData: Request,
  authToken?: string,
  options?: AxiosRequestConfig,
  fullError = false,
): Promise<Response> {
  const client = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
  });

  console.log(import.meta.env.VITE_BACKEND_URL);

  if (authToken) {
    client.defaults.headers.common = {
      Authorization: `Bearer ${authToken}`,
    };
  }

  try {
    const result = await client({
      url: path,
      method: "POST",
      data: requestData,
      ...(options || {}),
    });
    return result.data;
  } catch (error: unknown) {
    let errorMessage: string | AxiosError | unknown = error;
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (fullError) {
          errorMessage = error.response;
        } else if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else {
          errorMessage = `Request failed with status code:${error.response.status} ${error.response.statusText}`;
        }
      } else if (error.request) {
        errorMessage = error.request;
      } else if (error.message) {
        errorMessage = error.message;
      } else {
        errorMessage = `Unknown error type, ${error?.code}`;
      }
    }
    throw errorMessage;
  }
}
