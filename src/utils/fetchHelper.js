export default class FetchHelper {

  static async fetchWithRetry(url, options = {}, retries = 3, delay = 500) {

    const method = (options.method || 'GET').toUpperCase()

    try {

        const response = await fetch(url, options)

        if (
            retries > 0 &&
            (response.status === 429 || response.status >= 500) &&
            method !== 'POST'
        ) {
            await new Promise(r => setTimeout(r, delay))
            return FetchHelper.fetchWithRetry(url, options, retries - 1, delay * 2)
        }

        return response

    } catch (error) {

        if (retries > 0 && method !== 'POST') {
            await new Promise(r => setTimeout(r, delay))
            return FetchHelper.fetchWithRetry(url, options, retries - 1, delay * 2)
        }

        throw error
    }
  }

}