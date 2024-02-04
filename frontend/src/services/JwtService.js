const ID_TOKEN_KEY = 'token'

export const setToken = (token) => {
  localStorage.setItem(ID_TOKEN_KEY, token)
}

export const getToken = () => {
  return localStorage.getItem(ID_TOKEN_KEY)
}

export const destroyToken = () => {
  localStorage.removeItem(ID_TOKEN_KEY)
}
