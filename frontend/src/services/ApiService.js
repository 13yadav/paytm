import axios from '../plugins/axios'

class ApiService {
  /**
   * Get data from the specified URL using an HTTP GET request.
   *
   * @param {string} url - The URL to fetch data from.
   * @param {object} params - Optional parameters to include in the request URL.
   * @return {Promise} A promise that resolves with the fetched data.
   */
  static get(url, params = null) {
    return axios.get(`${url}`, { params })
  }

  /**
   * Stores a new resource to the specified URL.
   *
   * @param {string} url - The URL to send the POST request to.
   * @param {Object|null} params - The parameters to include in the request body.
   * @param {Object|null} headers - The headers to include in the request.
   * @return {Promise} A Promise that resolves to the response of the POST request.
   */
  static post(url, params = null, headers = null) {
    return axios.post(`${url}`, params, headers)
  }

  /**
   * Updates a resource from the specified URL.
   *
   * @param {string} url - The URL to send the PUT request to.
   * @param {object} params - The optional parameters to include in the request body.
   * @return {Promise} A Promise that resolves to the response data from the PUT request.
   */
  static put(url, params = null) {
    return axios.put(`${url}`, params)
  }

  /**
   * Deletes a resource from the specified URL.
   *
   * @param {string} url - The URL of the resource to delete.
   * @return {Promise} A Promise that resolves when the resource is successfully deleted.
   */
  static delete(url) {
    return axios.delete(url)
  }
}

export default ApiService
