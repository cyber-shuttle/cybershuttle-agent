import { defineStore } from 'pinia'

export const useUsersStore = defineStore('users', {
    state: () => ({ username: null, first_name: null, last_name: null , isLoggedIn: false, token: null}),
  getters: {
    userData: (state) => state,
    getIsLoggedIn: (state) => state.isLoggedIn,
  },
  actions: {
    setUsername(_username) {
      this.username = _username
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
    setUser(_user) {
        this.username = _user.username,
        this.first_name = _user.first_name,
        this.last_name = _user.last_name,
        this.isLoggedIn = _user.isLoggedIn
        this.token = _user.token
      },
  },
  persist: true,
  });