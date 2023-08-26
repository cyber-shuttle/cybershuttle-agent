import { defineStore } from 'pinia'

export const useUsersStore = defineStore('users', {
  state: () => ({
    username: null, userId: null, first_name: null,
    last_name: null, isLoggedIn: false, token: null, appId: null,
    consulToken: null, consulPath: null, consulHost: null, consulPort: null
  }),
  getters: {
    userData: (state) => state,
    getIsLoggedIn: (state) => state.isLoggedIn,
    getUserid: (state) => state.userId,
    getAppid: (state) => state.appId,
    getConulToken: (state) => state.consulToken,
    getConsulPath: (state) => state.consulPath,
    getConsulHost: (state) => state.consulHost,
    getConsulPort: (state) => state.consulPort,
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
    setConsulToken(_consul_token) {
      this.consulToken = _consul_token
    },
    setConsulPath(_consul_path) {
      this.consulPath = _consul_path
    },
    setConsulHost(_consul_host) {
      this.consulHost = _consul_host
    },
    setConsulPort(_consul_port) {
      this.consulPort = _consul_port
    },
    setUser(_user) {
      this.username = _user.username,
      this.userId = _user.userId,
      this.first_name = _user.first_name,
      this.last_name = _user.last_name,
      this.isLoggedIn = _user.isLoggedIn
      this.token = _user.token,
      this.appId = _user.appId,
      this.consulToken = _user.consulToken,
      this.consulPath = _user.consulPath,
      this.consulHost = _user.consulHost,
      this.consulPort = _user.consulPort
    },
  },
  persist: {
    storage: sessionStorage,
  },
});