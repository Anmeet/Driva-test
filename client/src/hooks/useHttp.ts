import { useState, useCallback } from 'react'

type RequestConfig = {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  headers?: { [key: string]: string }
  body?: any
}

type ApplyData<T> = (data: T) => void

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendRequest = useCallback(
    async <T>(requestConfig: RequestConfig, applyData?: ApplyData<T>) => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch(requestConfig.url, {
          method: requestConfig.method ? requestConfig.method : 'GET',
          headers: requestConfig.headers ? requestConfig.headers : {},
          body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        })

        if (!response.ok) {
          throw new Error('Request failed!')
        }

        const data = await response.json()
        applyData && applyData(data)
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message || 'Something went wrong!')
        } else {
          setError('Unknown error occurred')
        }
      }
      setIsLoading(false)
    },
    []
  )

  return {
    isLoading,
    error,
    sendRequest,
  }
}

export default useHttp
