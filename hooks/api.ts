import axios from 'axios'
import { getItemAsync } from 'expo-secure-store'

const api = axios.create({
    baseURL: "http://172.16.57.93:8000/app",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    params: {
        version: 'new-layout'
    }
})

api.interceptors.request.use(async (config: any) => {
    const token = await getItemAsync('token')

    if (!token) {
        return config
    }

    return {
        ...config,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
})

export default api