import { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

export const useApi = ({ url, options = {}, data: requestData = null }) => {
  const { getAccessTokenSilently } = useAuth0()
  const [state, setState] = useState({
    error: null,
    isLoading: true,
    data: null,
  })
  const [refreshIndex, setRefreshIndex] = useState(0)

  const callApi = async () => {
    try {
      const isPost = options.method && options.method.toUpperCase() === 'POST'
      if (isPost && !requestData) {
        setState({
          ...state,
          error: null,
          isLoading: false,
        })
        return
      }

      if (isPost) {
        options.body = JSON.stringify(requestData)
      }

      const accessToken = await getAccessTokenSilently()
      const response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          'Time-Zone': Intl.DateTimeFormat().resolvedOptions().timeZone,
          Authorization: `Bearer ${accessToken}`,
        },
      })
      setState({
        ...state,
        data: await response.json(),
        error: null,
        isLoading: false,
      })
    } catch (error) {
      setState({
        ...state,
        error,
        isLoading: false,
      })
    }
  }

  useEffect(() => {
    callApi()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshIndex])

  return {
    ...state,
    refresh: () => setRefreshIndex(refreshIndex + 1),
  }
}
