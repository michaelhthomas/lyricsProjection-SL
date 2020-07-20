import axios from 'axios'

const apiClient = axios.create({
    baseURL: `http://localhost:9000`,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type' : 'application/json'
    },
    timeout: 10000
})

export default {
    getLyrics() {
        return apiClient.get('/lyrics')
    },
    getLyric(index) {
        return apiClient.get('/lyrics/' + index)
    }
}