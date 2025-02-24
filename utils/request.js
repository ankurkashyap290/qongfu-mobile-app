import axios from 'axios';

const customError = (e) => {
  const errorJson = e.errorJson || {message: e.toString()};
  return {error: errorJson, status: 'ERROR'};
};

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(
  url,
  options,
  imageUpload = false,
  responseType = 'json',
) {
  const defaultOptions = {
    // credentials: 'include',
    method: 'GET',
  };
  const {body, ...otherOptions} = options;
  const newOptions = {...defaultOptions, ...otherOptions};
  let postData;
  if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
    if (imageUpload) {
      postData = body; //no change in body
    } else {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers,
      };
      postData = {...body};
    }
  }
  return axios({
    method: newOptions.method.toLowerCase(),
    url,
    responseType,
    headers: newOptions.headers,
    data: postData,
    onUploadProgress:
      imageUpload && newOptions.onUploadProgress
        ? newOptions.onUploadProgress
        : undefined,
  })
    .then((response) => {
      return {
        data: response.data || null,
        headers: response.headers,
        status: response.status,
      };
    })
    .catch((error) => {
      console.log('api error', error, error.response);
      if (error.code) {
        console.log('error', error.code);
      }
      if ('stack' in error && 'message' in error) {
        console.log({
          message: `Request error:${url}`,
          description: error.message,
        });
      }

      if (error.response && error.response.status) {
        return customError({
          errorJson: {
            status: error.response.status,
            error: error.response.data,
          },
        });
      } else {
        return customError(error);
      }
    });
}
