import { defineStore } from 'pinia'

export const useUsersStore = defineStore('users', {
  state: () => ({
    username: null, userId: null, first_name: null,
    last_name: null, isLoggedIn: false, token: null, appId: null
  }),
  getters: {
    userData: (state) => state,
    getIsLoggedIn: (state) => state.isLoggedIn,
    getUserid: (state) => state.userId,
    getAppid: (state) => state.appId,
  },
  actions: {
    setUsername(_username) {
      this.username = _username
    },
    setUserid(_userid) {
      this.userId = _userid
    },
    setFirstname(_first_name) {
      this.first_name = _first_name
    },
    setLastname(_last_name) {
      this.last_name = _last_name
    },
    setIsLoggedIn(_is_logged_in) {
      this.isLoggedIn = _is_logged_in
    },
    setToken(_token) {
      this.token = _token
    },
    setAppid(_appid) {
      this.appId = _appid
    },
    setUser(_user) {
      this.username = _user.username,
        this.userId = _user.userId,
        this.first_name = _user.first_name,
        this.last_name = _user.last_name,
        this.isLoggedIn = _user.isLoggedIn
      this.token = _user.token,
        this.token = _user.appId
    },
  },
  persist: {
    storage: sessionStorage,
  },
});