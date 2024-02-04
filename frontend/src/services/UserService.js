const USER_DATA_KEY = 'userData'

export const setUserData = (data) => {
  localStorage.setItem(USER_DATA_KEY, data)
}

export const getUserData = () => {
  return localStorage.getItem(USER_DATA_KEY)
}

export const destroyUserData = () => {
  localStorage.removeItem(USER_DATA_KEY)
}
