const KEY = 'library-user-token'

const saveToken = (user) => {
  localStorage.setItem(KEY, JSON.stringify(user))
}

const loadToken = () => {
  const token = localStorage.getItem(KEY)
  return token ? JSON.parse(token) : null
}

const removeToken = () => {
  localStorage.removeItem(KEY)
}

export default { saveToken, loadToken, removeToken }