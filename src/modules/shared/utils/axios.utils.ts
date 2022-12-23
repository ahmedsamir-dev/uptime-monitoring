import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const instance = axios.create()

instance.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
  //@ts-ignore
  config.headers['Request-Starttime'] = Date.now()

  return config
})

instance.interceptors.response.use((response: AxiosResponse): AxiosResponse => {
  const currentTime = Date.now()

  //@ts-ignore
  const startTime = response.config.headers['Request-Starttime']
  //@ts-ignore
  response.headers['Request-Duration'] = Math.abs(currentTime - startTime) / 1000

  return response
})

export { instance as axios }
